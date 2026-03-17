import React from "react";
import { useDispatch } from "react-redux";
import { deleteTicket } from "../../Store/BoardSlice";

const PRIORITY_STYLE = {
    high:   { bar: 'bg-red-500',   badge: 'bg-red-100 text-red-600'   },
    medium: { bar: 'bg-amber-400', badge: 'bg-amber-100 text-amber-600' },
    low:    { bar: 'bg-green-500', badge: 'bg-green-100 text-green-600' },
};

function TicketDetailPanel({ ticket, onClose, onEdit }) {
    const dispatch = useDispatch();
    const style = PRIORITY_STYLE[ticket.priority] ?? PRIORITY_STYLE.medium;

    const handleDelete = () => {
        dispatch(deleteTicket(ticket.id));
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200]"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed top-0 right-0 w-80 h-full bg-white z-[201]
                            shadow-2xl flex flex-col overflow-hidden
                            animate-[slideInPanel_0.22s_cubic-bezier(0.22,1,0.36,1)]">

                {/* Top colour bar */}
                <div className={`h-1.5 w-full shrink-0 ${style.bar}`} />

                <div className="flex flex-col flex-1 px-6 py-5 overflow-y-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-slate-400 font-mono">#{ticket.id}</span>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-lg
                                       bg-slate-100 text-slate-400 text-sm
                                       hover:bg-red-100 hover:text-red-500 transition-colors"
                        >✕</button>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-slate-800 leading-snug mb-4">
                        {ticket.title}
                    </h2>

                    {/* Badges */}
                    <div className="flex gap-4 mb-5">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                Priority
                            </span>
                            <span className={`text-xs font-bold px-3 py-0.5 rounded-full
                                             ${style.badge}`}>
                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                Status
                            </span>
                            <span className="text-xs font-bold px-3 py-0.5 rounded-full
                                            bg-slate-100 text-slate-600 capitalize">
                                {ticket.status.replace(/_/g, ' ')}
                            </span>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 mb-5" />

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Description
                        </span>
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {ticket.description
                                ? ticket.description
                                : <span className="italic text-slate-300">No description provided.</span>
                            }
                        </p>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Actions */}
                    <div className="flex gap-3 pt-5 border-t border-slate-100">
                        <button
                            onClick={onEdit}
                            className="flex-1 py-2.5 text-sm font-semibold rounded-lg
                                       bg-blue-50 text-blue-600
                                       hover:bg-blue-100 active:scale-95 transition-all"
                        >
                            ✏️ Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex-1 py-2.5 text-sm font-semibold rounded-lg
                                       bg-red-50 text-red-500
                                       hover:bg-red-100 active:scale-95 transition-all"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TicketDetailPanel;