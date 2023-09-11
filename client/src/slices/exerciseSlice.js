import { createSlice } from '@reduxjs/toolkit';

export const exerciseSlice = createSlice({
    name: 'exercises',
    initialState: {
        savedExercises: [],
    },
    reducers: {
        setSavedExercises: (state, action) => {
            state.savedExercises = action.payload;
        },
    },
});

export const { setSavedExercises } = exerciseSlice.actions;

export const selectSavedExercises = (state) => state.exercises.savedExercises;

export default exerciseSlice.reducer;