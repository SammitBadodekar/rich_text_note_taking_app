import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import noteReducer from "./noteSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        note: noteReducer,
    },
});