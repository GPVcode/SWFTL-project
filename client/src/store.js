import { configureStore } from '@reduxjs/toolkit';
import openaiReducer from './slices/openaiSlice';

export const store = configureStore({
    reducer: {
        openai: openaiReducer,
    }
})