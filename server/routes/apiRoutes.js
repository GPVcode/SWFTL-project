import express, { response } from 'express';
import fetch from 'node-fetch';
import dotenv from "dotenv";
import { openai } from '../index.js';

dotenv.config();
const router = express()

router.post('/generate-prompt', async (req, res) => {
    try{
        const { topic } = req.body;
        console.log("topic: ", topic)
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a tutor."},
                { role: "user", content: `Give me a reading comprehension exercise about ${topic}. Don't provide solutions.`}
            ],
        });

        const data = response.data.choices[0];
        res.status(200).send(data)
    } catch (error){
        console.error('Error fetching response from OpenAI:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

export default router