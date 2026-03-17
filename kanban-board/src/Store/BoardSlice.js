import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({// for state,reducers,andactions
    name: 'kanban',// name of slice

    initialState: {
        boards: [
            { title: 'To Do', status: 'TODO' },
            { title: 'In Progress', status: 'IN_PROGRESS' },
            { title: 'Testing', status: 'TESTING' },
            { title: 'Done', status: 'DONE' }
        ],
        tickets: [
            { id: '1', title: 'Design landing page', description: 'Create wireframes and mockups for the homepage', priority: 'high', status: 'TODO' },
            { id: '2', title: 'Setup project repo', description: 'Initialize Git repository and configure CI/CD pipeline', priority: 'medium', status: 'TODO' },
            { id: '3', title: 'Build auth module', description: 'Implement login, signup, and OAuth flows', priority: 'high', status: 'IN_PROGRESS' },
            { id: '4', title: 'Write unit tests', description: 'Cover core business logic with Jest test suites', priority: 'low', status: 'TESTING' },
            { id: '5', title: 'Deploy to staging', description: 'Push latest build to staging environment', priority: 'medium', status: 'DONE' },
        ]
    },

    reducers: {// functions to change the state
        addTicket: (state, action) => {// action mein payload mein jo hai wo sab aye ga
            // payload: id,title,description,priority,status 
            state.tickets.push(action.payload);// push the new ticket to the array
        },

        editTicket: (state, action) => {
            // payload: id,title,description,priority,status 
            const { id, title, description, priority, status } = action.payload;
            const ticket = state.tickets.find(t => t.id === id);// find the ticket position and if it exists then edit it
            if (ticket) {
                ticket.title = title;
                ticket.description = description;
                ticket.priority = priority;
                ticket.status = status;
            }
        },

        deleteTicket: (state, action) => {
            // payload:ticket id string
            state.tickets = state.tickets.filter(t => t.id !== action.payload);
        },

        moveTicket: (state, action) => {
            // payload: { ticketId, newStatus }
            const { ticketId, newStatus } = action.payload;
            const ticket = state.tickets.find(t => t.id === ticketId);
            if (ticket) ticket.status = newStatus;
        }
    }
});

export const { addTicket, editTicket, deleteTicket, moveTicket } = boardSlice.actions;
export default boardSlice.reducer;