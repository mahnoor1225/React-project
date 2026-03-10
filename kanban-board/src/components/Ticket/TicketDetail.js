import React from "react";
import { useDispatch } from "react-redux";
import { deleteTicket } from "../../Store/BoardSlice";
import './TicketDetail.css';

const PRIORITY_COLORS = {
    high:   { badge: '#fee2e2', text: '#dc2626', bar: '#ef4444' },
    medium: { badge: '#fef3c7', text: '#d97706', bar: '#f59e0b' },
    low:    { badge: '#dcfce7', text: '#16a34a', bar: '#22c55e' },
};

function TicketDetailPanel({ ticket, onClose, onEdit }) {
    const dispatch = useDispatch();
    const colors   = PRIORITY_COLORS[ticket.priority] || PRIORITY_COLORS.medium;

    const handleDelete = () => {
        dispatch(deleteTicket(ticket.id));
        onClose(); // close panel after delete
    };

    return (
        <>
            {/* Backdrop */}
            <div className="panel_backdrop" onClick={onClose} />

            {/* Sliding panel */}
            <div className="ticket_detail_panel">
                {/* Coloured top bar */}
                <div className="panel_color_bar" style={{ background: colors.bar }} />

                <div className="panel_inner">
                    {/* Header row */}
                    <div className="panel_header">
                        <span className="panel_ticket_id">#{ticket.id}</span>
                        <button className="panel_close_btn" onClick={onClose}>✕</button>
                    </div>

                    {/* Title */}
                    <h2 className="panel_title">{ticket.title}</h2>

                    {/* Meta row */}
                    <div className="panel_meta">
                        <div className="panel_meta_item">
                            <span className="panel_meta_label">Priority</span>
                            <span
                                className="panel_priority_badge"
                                style={{ background: colors.badge, color: colors.text }}
                            >
                                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                            </span>
                        </div>
                        <div className="panel_meta_item">
                            <span className="panel_meta_label">Status</span>
                            <span className="panel_status_badge">{ticket.status.replace('_', ' ')}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="panel_divider" />

                    {/* Description */}
                    <div className="panel_section">
                        <span className="panel_section_label">Description</span>
                        <p className="panel_description">
                            {ticket.description || <span className="panel_empty">No description provided.</span>}
                        </p>
                    </div>

                    {/* Spacer pushes actions to bottom */}
                    <div className="panel_spacer" />

                    {/* Actions */}
                    <div className="panel_actions">
                        <button className="panel_btn edit" onClick={onEdit}>
                            ✏️ Edit Ticket
                        </button>
                        <button className="panel_btn delete" onClick={handleDelete}>
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TicketDetailPanel;