import React from "react";
import {MoreHorizontal} from "react-feather"
import './Board.css'
import Ticket from "../ticket/ticket";

function Board() {
    return(
        <div className='board'>
            <div className="board_title">
            <div className='board_title Left'>
                <div className='title'>To do 
                    <span>2</span>
                </div>
            </div>
            <MoreHorizontal className='moreIcon'/> 
                {/* react feather library for icons */}
            </div>
            <div className="ticketContainer">
                <div className="ticket">
                    <Ticket />
                </div>
            </div>
        </div>
    );
}

export default Board;