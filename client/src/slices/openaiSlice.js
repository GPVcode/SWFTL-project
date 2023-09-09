import { createSlice } from '@reduxjs/toolkit';

export const openaiSlice = createSlice({
    name: 'openai',
    initialState: {
        response: '',
        AiEvaluation: '',
    },
    reducers: {
        setResponse: (state, action) => {
            state.response = action.payload;
        },
        setAiEvaluation: (state, action) => {
            state.AiEvaluation = action.payload;
        },
    },
});

export const { setResponse, setAiEvaluation } = openaiSlice.actions;

export const selectOpenAIResponse = (state) => state.openai.response;
export const selectAiEvaluation = (state) => state.openai.AiEvaluation;

export default openaiSlice.reducer;