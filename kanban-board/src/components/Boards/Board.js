import React from "react";
import { MoreHorizontal } from "react-feather";
import "./Board.css";
import Ticket from "../ticket/ticket";

function Board() {
  return (
    <div className="board">
      <div className="board_title">
        <div className="board_title_left">
          <div className="title">
            To do <span>2</span>
          </div>
        </div>
        <MoreHorizontal />
      </div>

      <div className="ticketContainer custom-scroll">
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
        <Ticket />
      </div>
    </div>
  );
}

export default Board;