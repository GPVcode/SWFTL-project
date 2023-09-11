import express, { response } from 'express';
import fetch from 'node-fetch';
import dotenv from "dotenv";
import Exercise from '../Schemas/excerciseSchema.js';
import { openai } from '../index.js';

dotenv.config();
const router = express();

router.post('/generate-prompt', async (req, res) => {
    try{
        const { topic, answer, readingExcercise} = req.body;
 

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You tutor through reading comprehension excercises."},
                { role: "user", content: `Give me exactly 1 reading comprehension exercise about ${topic} with exactly 4 paragraphs. After each paragraph use "<br/><br/>" to symbolize a new paragraph is needed. Start every reading excercise with "Reading Comprehension Exercise: <title-goes-here> <br/><br/>". Never use more than two "<br/>" The question section starts with "Questions: <br/>". There will only be one question section at the end providing 4 questions. After each question put "<br/>". Don't provide solutions. Do not ever use quotations. Never use the following phrases: "Paragraph 1:", Paragraph 2:", Paragraph 3:", or Paragraph 4:"`},
                { role: "assistant", content: `This is the reading comprehension excercise: ${readingExcercise}. This is the user's response to the reading excercise questions: ${answer}. Spartan; Conversational; Encouraging; Provide feedback on how well the user performed. Before "1." put "<br/>". After each answer put "<br/><br/>" before the next number` }
            ], 
        });
        const data = response.data.choices[0];
        res.status(200).send(data)
    } catch (error){
        console.error('Error fetching response from OpenAI:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/save-excercise', async (req, res) => {
    try {
        const { topic, answer, readingExercise, evaluation } = req.body;
        const exercise = new Exercise({
            topic,
            readingExercise,
            answer,
            evaluation,
        });

        await exercise.save();

        res.status(200).json({ message: 'Exercise saved successfully' });
    } catch (error) {
        console.error('Error saving exercise:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/exercises', async (req, res) => {
    try{
        const exercises = await Exercise.find().sort({ dateCreated: -1 }); // Get exercises in descending order
        res.status(200).json(exercises);
    } catch(error) {
        console.error('Error fetching exercises:', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

router.get('/exercises/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID from server", id)
    try{
        const exercise = await Exercise.findById(id);
        if(!exercise){
            return res.status(404).json({ error: 'Exercise not found' });
        }
        console.log("server exercise: ", exercise)
        res.status(200).json(exercise)
    } catch(error){
        console.error('Error fetching exercise: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default router