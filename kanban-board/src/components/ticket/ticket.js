import React from "react";
import './Ticket.css';

function Ticket({ id, title, description, priority, onClick }) {

    const handleDragStart = (e) => {
        e.dataTransfer.setData('ticketId', id);
        e.currentTarget.classList.add('dragging');
    };

    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove('dragging');
    };

    return (
        <div
            className={`ticket_layout priority_${priority}`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={onClick}
            title="Click to view details"
        >
            <div className="ticket_priority_bar" />
            <div className="ticket_body">
                <div className="ticket_top">{title}</div>
                {description && (
                    <div className="ticket_description">{description}</div>
                )}
                <div className="ticket_footer">
                    <span className={`priority_badge ${priority}`}>{priority}</span>
                    <span className="ticket_id">#{id}</span>
                </div>
            </div>
        </div>
    );
}

export default Ticket;