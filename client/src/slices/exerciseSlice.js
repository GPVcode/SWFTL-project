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
        deleteExercises: (state, action) => {
            const exerciseIdsToDelete = action.payload;
            state.savedExercises = state.savedExercises.filter(exercise => !exerciseIdsToDelete.includes(exercise._id));
        },
    },
});

export const { setSavedExercises, deleteExercises } = exerciseSlice.actions;

export const selectSavedExercises = (state) => state.exercises.savedExercises;

export default exerciseSlice.reducer;