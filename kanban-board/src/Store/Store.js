import { configureStore } from "@reduxjs/toolkit";
import boardReducer from './BoardSlice';

const store = configureStore({
    reducer: {
        kanban: boardReducer
    }
});

export default store;