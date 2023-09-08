import { createSlice } from '@reduxjs/toolkit';

export const openaiSlice = createSlice({
    name: 'openai',
    initialState: {
        response: '',
        userAnswer: '',
    },
    reducers: {
        setResponse: (state, action) => {
            state.response = action.payload;
        },
        setUserAnswer: (state, action) => {
            state.userAnswer = action.payload;
        },
    },
});

export const { setResponse, setUserAnswer } = openaiSlice.actions;

export const selectOpenAIResponse = (state) => state.openai.response;
export const selectUserAnswer = (state) => state.openai.userAnswer;

export default openaiSlice.reducer;