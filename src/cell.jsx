import React from 'react';
import {useState} from 'react';

function Cell(props) {

const [isAlive, setIsAlive] = useState(false)
const [board, setBoard] = useState(props.board)

function handleAlive() {
    debugger
    setIsAlive(!isAlive)
    debugger
    console.log(board)
    const newBoard = board.map((arr) => arr.slice());
    debugger
    newBoard[props.r][props.c] = 1
    debugger
    setBoard(newBoard)
    debugger
}

console.log(isAlive)
console.log(board)

return (
    <div>
        {!isAlive ?
            <p style={{background:"red", height:"10px", width:"10px", cursor:"pointer"}} onClick={handleAlive}>{props.pos}</p> :
            <p style={{background:"black", height:"10px", width:"10px", cursor:"pointer"}} onClick={handleAlive}>{props.pos}</p>
        }
    </div>
)

}

export default Cell;

// how do I, upon cell click, change the value of that cell in the board to '1' (or back to '0' if clicked again)
// and have the board update each time and previous clicks/updates persist until I'm read to press start.

// how do I get the function to return something that appears on the broswer