import express, { response } from 'express';
import fetch from 'node-fetch';
import dotenv from "dotenv";
import Exercise from '../Schemas/excerciseSchema.js';
import { openai } from '../index.js';

dotenv.config();
const router = express();

router.post('/generate-prompt', async (req, res) => {
    try{
        const { topic, mode, answer, readingExcercise} = req.body;
 
        let response;
        if(mode === 'Reading Comprehension'){
            response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an assistant."},
                    { role: "user", content: `Give me a ${mode} exercise about ${topic} 1000 characters long. 
                        - The first line is always the name of the reading;
                        - The second line is "<br/><br/>";
                        - After each paragraph, put two break elements "<br/><br/>." Use at most two break elements in a row.;
                        - The question section title is "</br></br>Questions:";
                        - Put two break elements "<br/><br/>" after the questions section title.;
                        - Always have break elements.;
                        - There will only be one question section at the end providing four questions.;
                        - put two break element like "<br/><br/>" specifically before every "1", "2", "3", or "4".;
                        - Don't provide solutions.;
                        - Don't use quotations.;`
                    },
                    { role: "assistant", content: `The reading comprehension exercise is: ${readingExcercise}.
                    The user's response to the reading exercise questions: ${answer}. Ensure it follows these guidelines:
                    - Conversational;
                    - Understanding; 
                    - Tell the user if they are incorrect; 
                    - Put two break element like "<br/><br/>" specifically before every "1", "2", "3", or "4".;
                    - "<br/> will be used 4 times.`
                }

                ], 
            });
        } else {
            response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are an assistant."},
                    { role: "user", content: `Generate a self-reflective ${mode} exercise about ${topic}. Ensure it follow these guidelines:
                    - Use less than 300 characters
                    - Encouraging
                    - Thought-provoking
                    - Personable
                    `
                    },
                    { role: "assistant", content: `The journaling exercise is: ${readingExcercise}.
                    Be the user's best friend based on their journal entry: ${answer}. Ensure it follows these guidelines:
                    - Conversational;
                    - Understanding; 
                    - Encouraging;
                    -Inspirational;`
                }
    
                ], 
            });
        }

        const data = response.data.choices[0];
        res.status(200).send(data)
    } catch (error){
        console.error('Error fetching response from OpenAI:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/save-excercise', async (req, res) => {
    try {
        const { mode, topic, answer, readingExercise, evaluation } = req.body;
        console.log("topic: ", topic)
        console.log("mode: ", mode)

        const exercise = new Exercise({
            mode,
            topic,
            readingExercise,
            answer,
            evaluation,mode
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

router.delete('/exercises', async (req, res) => {
    const { exerciseIds } = req.body;

    try {
        await Exercise.deleteMany({ _id: { $in: exerciseIds } });
        res.status(200).json({ message: 'Exercises deleted successfully' });
    } catch (error) {
        console.error('Error deleting exercises:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
export default router