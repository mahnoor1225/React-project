import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { moveTicket } from "../../Store/BoardSlice";
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
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col w-64 min-w-64 rounded-2xl p-3 border-2 transition-all
                        ${isDragOver
                            ? 'bg-indigo-50 border-dashed border-indigo-400 shadow-indigo-100 shadow-lg'
                            : 'bg-slate-100 border-transparent'
                        }`}
        >
            {/* Column header */}
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b-2 border-slate-200">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                    {title}
                </span>
                <span className="text-xs font-bold bg-slate-200 text-slate-500
                                 rounded-full px-2.5 py-0.5 font-mono">
                    {tickets.length}
                </span>
            </div>

            {/* Ticket list */}
            <div className="flex flex-col gap-0.5 flex-1">
                {tickets.length === 0 && !showForm && (
                    <div className="flex items-center justify-center text-xs text-slate-400
                                    border-2 border-dashed border-slate-300 rounded-xl
                                    min-h-20 mt-1">
                        Drop tickets here
                    </div>
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

            {/* Add form or button */}
            {showForm ? (
                <AddTicketForm status={status} onClose={() => setShowForm(false)} />
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="mt-3 w-full py-2 text-sm font-semibold text-slate-400
                               border-2 border-dashed border-slate-300 rounded-lg
                               hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50
                               transition-all cursor-pointer"
                >
                    + Add Ticket
                </button>
            )}
        </div>
    );
}

export default Board;