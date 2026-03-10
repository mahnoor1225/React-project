import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTicket } from "../../Store/BoardSlice";
import './Modal.css';

function TicketModal({ ticket, onClose }) {
    const dispatch = useDispatch();
    const boards   = useSelector(state => state.kanban.boards);

    const [title,       setTitle]       = useState(ticket.title);
    const [description, setDescription] = useState(ticket.description || "");
    const [priority,    setPriority]    = useState(ticket.priority);
    const [status,      setStatus]      = useState(ticket.status);
    const [titleError,  setTitleError]  = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setTitleError("Title is required");
            return;
        }

        dispatch(editTicket({
            id:          ticket.id,
            title:       title.trim(),
            description: description.trim(),
            priority,
            status,
        }));

        onClose();
    };

    return (
        <div className="modal_overlay" onClick={onClose}>
            <div className="modal_box" onClick={e => e.stopPropagation()}>

                <div className="modal_header">
                    <h2>Edit Ticket</h2>
                    <button className="modal_close" type="button" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal_body">

                        <label htmlFor="edit_title">
                            Title <span className="required">*</span>
                        </label>
                        <input
                            id="edit_title"
                            className={`modal_input ${titleError ? "modal_input_error" : ""}`}
                            placeholder="e.g. Fix login bug"
                            value={title}
                            onChange={e => { setTitle(e.target.value); setTitleError(""); }}
                        />
                        {titleError && <p className="modal_error">{titleError}</p>}

                        <label htmlFor="edit_description">Description</label>
                        <textarea
                            id="edit_description"
                            className="modal_input modal_textarea"
                            placeholder="What needs to be done?"
                            rows={3}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <div className="modal_row">
                            <div className="modal_field">
                                <label htmlFor="edit_priority">Priority</label>
                                <select
                                    id="edit_priority"
                                    className="modal_input"
                                    value={priority}
                                    onChange={e => setPriority(e.target.value)}
                                >
                                    <option value="high">🔴 High</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="low">🟢 Low</option>
                                </select>
                            </div>
                            <div className="modal_field">
                                <label htmlFor="edit_status">Board</label>
                                <select
                                    id="edit_status"
                                    className="modal_input"
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                >
                                    {boards.map(b => (
                                        <option key={b.status} value={b.status}>{b.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className="modal_footer">
                        <button type="button" className="modal_btn cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="modal_btn submit">
                            Save Changes
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default TicketModal;