import React from 'react';
import {useState, useEffect} from 'react';
import { getNextGeneration } from './gol';
import {block, blinker, glider, pulsar, hammerhead, gosper} from './templates';
import Cell from './cell';
import Modal from './modal'
import './game.css';
import {BsLinkedin, BsGithub} from 'react-icons/bs'

function Game() {
    const grid = Array.from(Array(36), () => new Array(100).fill())
    
    const convertGrid = (twoD) => {
        const obj = {}
        for (let i=0; i<twoD.length; i++) {
            obj[i] = []
            for (let j=0; j<twoD[i].length; j++) {
                if (twoD[i][j] !== undefined) {
                    obj[i].push(j)
                } 
            }
        }
        return obj
    }

    const convertObject = (object) => {
        const twoD = Array.from(Array(36), () => new Array(100).fill())
        for (let row in object) {
            if (twoD[row]) { 
            const cols = object[row] 
                if (cols.length) {
                    for (let i=0; i<cols.length; i++) {
                        if (cols[i] <=99) { 
                            twoD[row][cols[i]] = 1
                        }
                    }
                }
            }
        }
        return twoD
    }
    
    const [board, setBoard] = useState(grid)
    const [gameRunning, setGamerunning] = useState(false)
    const [newObj, setNewObj] = useState({})
    const [generation, setGeneration] = useState(0)
    const [modal, setModal] = useState(false)
    const [gameOn, setGameOn] = useState(false)

    const handleStart = () => {
        setNewObj(convertGrid(board))
        setGamerunning(true)
        setGameOn(true)
    }

    useEffect(() => {
        if (gameRunning) {
            const newIntervalId = setInterval(() => {
                const nextGeneration = getNextGeneration(newObj) 
                const nextBoard = convertObject(nextGeneration) 
                setBoard(nextBoard)
                console.log(board)
                setGeneration(prevGeneration => prevGeneration + 1)
                setNewObj(nextGeneration)
                console.log(newObj)
            }, 90);
            return (()=> clearInterval(newIntervalId))
        }
    })

    const handleStop = () => {
        setGamerunning(false)
    }

    const handleReset = () => {
        setGamerunning(false)
        setGameOn(false)
        setBoard(grid)
        setGeneration(0)
        setNewObj({})
        const selectbox = document.getElementById('temp')
        selectbox.selectedIndex = 0
    }

    const handleNext = () => { 
        setGamerunning(false)
        setGameOn(true)
        const nextGeneration = getNextGeneration(convertGrid(board)) 
        const nextBoard = convertObject(nextGeneration)
        setBoard(nextBoard)
        setGeneration(prevGeneration => prevGeneration + 1)
        setNewObj(nextGeneration)
    }

    const handleInput = (e) => {
        if (gameRunning) {
            setGamerunning(false)
            setGeneration(0)
        }
        if (gameOn) setGameOn(!gameOn)
        const obj = {"grid": grid, "block": block, "blinker": blinker, "glider": glider, "pulsar": pulsar, "hammerhead": hammerhead, "gosper": gosper}
        const boardType = e===null ? "grid" : e.target.value
        const variableVersion = obj[boardType]
        setBoard(variableVersion)
    }

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    return (
        <div className='all'>
            <div className='header'>
                <div className='menu'>
                <label className='label'>Favorites</label>
                <br />
                <select id='temp' onChange={handleInput}>
                    <option value='grid'>-- Please Select --</option>
                    <option value='block'>Block</option>
                    <option value='blinker'>Blinker</option>
                    <option value='pulsar'>Pulsar</option>
                    <option value='glider'>Glider</option>
                    <option value='hammerhead'>Hammerhead</option>
                    <option value='gosper'>Gosper Glider Gun</option>
                </select>
                </div>
                <p className='title'>Conway's Game of Life</p>
                <p className='credit'>Implementation by Sean Mackey</p>
                <div className='icons'>
                    <a href="https://www.linkedin.com/in/sean-mackey123/" target="_blank" rel="noreferrer"><span className="label"><BsLinkedin className='icon' /></span></a>
                    {/* <a href="https://seanmackey.me/" target="_blank" rel="noreferrer"><span className="label" >Portfolio</span></a>
                    <a href="https://github.com/smackey15" target="_blank" rel="noreferrer"><span className="label"><BsGithub /></span></a> */}
                </div>
            </div>
            <div>
                <ul className='grid'>
                {board.map((row,i) => 
                    row.map((col,j) =>
                    <Cell
                    key={[i,j]}
                    r={i}
                    c={j}
                    pos={board[i][j]}
                    board={board}
                    setBoard={setBoard}
                />))
                }
                </ul>
           </div>
           <br />
           <div className='footer'>
                {!gameOn ?
                 <button className='start-off' onClick={handleStart}>Start</button> :
                 <button className='start-on' onClick={handleStart}>Start</button>
                }
                {!gameOn ?
                 <button className='next-off' onClick={handleNext}>Next</button> :
                 <button className='next-on' onClick={handleNext}>Next</button>
                }   
                {!gameOn ?
                 <button className='stop-off' onClick={handleStop}>Stop</button> :
                 <button className='stop-on' onClick={handleStop}>Stop</button> 
                 }
                 {!gameOn ?
                 <button className='reset-off' onClick={handleReset}>Reset</button> :
                 <button className='reset-on' onClick={handleReset}>Reset</button>
                 }
                <div className='generations'>Generations: {generation}</div>
                <button className='instructions' onClick={openModal}>Instructions</button>
            </div>

            {modal ? 
                    <div onClick={closeModal} className="modal">
                        <div onClick={(e) => e.stopPropagation()} className="content">
                            <Modal/>
                            <button className='modal-exit' onClick={closeModal}>Back to Game</button>
                        </div>
                    </div>
                : <></>
            } 
        </div>
    )
}

export default Game;

