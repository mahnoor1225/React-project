import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
    name: 'kanban',

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

    reducers: {
        addBoard: (state, action) => {
            // payload: { title, status }
            state.boards.push(action.payload);
        },

        removeBoard: (state, action) => {
            // payload: status string
            state.boards = state.boards.filter(b => b.status !== action.payload);
            state.tickets = state.tickets.filter(t => t.status !== action.payload);
        },

        addTicket: (state, action) => {
            // payload: { id, title, description, priority, status }
            state.tickets.push(action.payload);
        },

        removeTicket: (state, action) => {
            // payload: ticket id string
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

export const { addBoard, removeBoard, addTicket, removeTicket, moveTicket } = boardSlice.actions;
export default boardSlice.reducer;