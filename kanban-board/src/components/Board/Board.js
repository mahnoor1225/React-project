import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { moveTicket } from "../../Store/BoardSlice";
import './Board.css';
import Ticket from '../Ticket/Ticket';
import AddTicketForm from './AddTicketForm';

function Board({ title, status, tickets, onTicketClick }) {
    const dispatch = useDispatch();
    const [isDragOver, setIsDragOver] = useState(false);
    const [showForm,   setShowForm]   = useState(false);

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
            <div className="board_top">
                <span className="board_title">{title}</span>
                <span className="board_count">{tickets.length}</span>
            </div>

            <div className="tickets">
                {tickets.length === 0 && !showForm && (
                    <div className="empty_state">Drop tickets here</div>
                )}
                {tickets.map(ticket => (
                    <Ticket
                        key={ticket.id}
                        id={ticket.id}
                        title={ticket.title}
                        description={ticket.description}
                        priority={ticket.priority}
                        onClick={() => onTicketClick(ticket.id)}
                    />
                ))}
            </div>

            {showForm ? (
                <AddTicketForm
                    status={status}
                    onClose={() => setShowForm(false)}
                />
            ) : (
                <button className="board_add_btn" onClick={() => setShowForm(true)}>
                    + Add Ticket
                </button>
            )}
        </div>
    );
}

export default Board;