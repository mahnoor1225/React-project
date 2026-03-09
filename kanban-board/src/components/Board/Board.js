import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { moveTicket } from "../../Store/BoardSlice";
import './Board.css';
import Ticket from '../Ticket/Ticket';

function Board({ title, status, tickets, onAddTicket }) {
    const dispatch = useDispatch();
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver  = (e) => { e.preventDefault(); setIsDragOver(true); };
    const handleDragLeave = ()  => setIsDragOver(false);
    const handleDrop      = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const ticketId = e.dataTransfer.getData('ticketId');
        if (ticketId) dispatch(moveTicket({ ticketId, newStatus: status }));
    };

    return (
        <div
            className={`board_layout ${isDragOver ? 'drag_over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Header */}
            <div className="board_top">
                <span className="board_title">{title}</span>
                <span className="board_count">{tickets.length}</span>
            </div>

            {/* Tickets */}
            <div className="tickets">
                {tickets.length === 0 && (
                    <div className="empty_state">Drop tickets here</div>
                )}
                {tickets.map(ticket => (
                    <Ticket
                        key={ticket.id}
                        id={ticket.id}
                        title={ticket.title}
                        description={ticket.description}
                        priority={ticket.priority}
                    />
                ))}
            </div>

            {/* Add Ticket button */}
            <button className="board_add_btn" onClick={onAddTicket}>
                + Add Ticket
            </button>
        </div>
    );
}

export default Board;