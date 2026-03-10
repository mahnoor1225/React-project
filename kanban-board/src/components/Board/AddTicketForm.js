import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTicket } from "../../Store/BoardSlice";
import './AddTicketForm.css';

function AddTicketForm({ status, onClose }) {
    const dispatch = useDispatch();

    const [title,       setTitle]       = useState("");
    const [description, setDescription] = useState("");
    const [priority,    setPriority]    = useState("medium");
    const [titleError,  setTitleError]  = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setTitleError("Title is required");
            return;
        }

        dispatch(addTicket({
            id:          Date.now().toString(),
            title:       title.trim(),
            description: description.trim(),
            priority,
            status,
        }));

        // reset and close
        setTitle("");
        setDescription("");
        setPriority("medium");
        setTitleError("");
        onClose();
    };

    return (
        <div className="add_ticket_form_wrapper">
            <form className="add_ticket_form" onSubmit={handleSubmit}>

                <div className="form_field">
                    <input
                        className={`form_input ${titleError ? "form_input_error" : ""}`}
                        placeholder="Ticket title *"
                        value={title}
                        autoFocus
                        onChange={e => { setTitle(e.target.value); setTitleError(""); }}
                    />
                    {titleError && <span className="form_error">{titleError}</span>}
                </div>

                <div className="form_field">
                    <textarea
                        className="form_input form_textarea"
                        placeholder="Description (optional)"
                        rows={2}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div className="form_field">
                    <select
                        className="form_input form_select"
                        value={priority}
                        onChange={e => setPriority(e.target.value)}
                    >
                        <option value="high">🔴 High</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="low">🟢 Low</option>
                    </select>
                </div>

                <div className="form_actions">
                    <button type="submit" className="form_btn_submit">Add Ticket</button>
                    <button type="button" className="form_btn_cancel" onClick={onClose}>Cancel</button>
                </div>

            </form>
        </div>
    );
}

export default AddTicketForm;