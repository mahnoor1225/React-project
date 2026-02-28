import React from "react";
import {MoreHorizontal} from "react-feather"
import './Board.css'

function Board() {
    return(
        <div className='board'>
            <div className='board_title'>
                <p className='title'>To do<span>2</span></p>
                <MoreHorizontal />
            </div>
            <div className="boardTickets">
                <h3>card 1</h3>
                <h3>card 2</h3>
            </div>
        </div>
    );
}

export default Board;