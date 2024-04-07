import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentNote: null,
};

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setNote: (state, action) => {
            state.currentNote = action.payload;
        },
        clearNote: (state) => {
            state.currentNote = null;
        },
    },
});

export const { setNote, clearNote } = noteSlice.actions;

export default noteSlice.reducer;