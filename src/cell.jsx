import React from 'react';

function Cell(props) {

    function handleAlive() {
        const newBoard = props.board.map((arr) => arr.slice());
        if (props.pos !== 1) {
            newBoard[props.r][props.c] = 1
         } else {
            newBoard[props.r][props.c] = undefined
         }
        props.setBoard(newBoard)
    }

    return (
        props.pos !== 1 ?
            <div className='dead-cell' onClick={handleAlive}></div> :
            <div className='live-cell' onClick={handleAlive}></div>
    )
}

export default Cell;

