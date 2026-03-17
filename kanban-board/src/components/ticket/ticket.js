import React from "react";

const PRIORITY_BAR = {
    high:   'bg-red-500',
    medium: 'bg-amber-400',
    low:    'bg-green-500',
};

const PRIORITY_BADGE = {
    high:   'bg-red-100 text-red-600',
    medium: 'bg-amber-100 text-amber-600',
    low:    'bg-green-100 text-green-600',
};

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
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={onClick}
            className="flex flex-row bg-white rounded-xl mb-2 overflow-hidden cursor-pointer
                       border border-slate-100 shadow-sm
                       hover:-translate-y-0.5 hover:shadow-md hover:border-indigo-200
                       transition-all select-none"
        >
            {/* Priority bar */}
            <div className={`w-1.5 shrink-0 ${PRIORITY_BAR[priority] ?? 'bg-slate-300'}`} />

            {/* Body */}
            <div className="flex flex-col gap-1.5 px-3 py-2.5 flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 leading-snug">{title}</p>
                {description && (
                    <p className="text-xs text-slate-400 truncate">{description}</p>
                )}
                <div className="flex items-center justify-between mt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wide
                                     px-2 py-0.5 rounded-full
                                     ${PRIORITY_BADGE[priority] ?? 'bg-slate-100 text-slate-500'}`}>
                        {priority}
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">#{id}</span>
                </div>
            </div>
        </div>
    );
}

export default Ticket;