import { configureStore } from '@reduxjs/toolkit';
import openaiReducer from './slices/openaiSlice';
import exerciseReducer from './slices/exerciseSlice';

export const store = configureStore({
    reducer: {
        openai: openaiReducer,
        exercises: exerciseReducer,
    },
});