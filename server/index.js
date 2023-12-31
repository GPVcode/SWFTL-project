import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import apiRoutes from './routes/apiRoutes.js';
import { Configuration, OpenAIApi } from "openai";

const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(cors());

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB.');

        app.listen(process.env.PORT, (req, res) => {
            console.log(`Listening on port: ${process.env.PORT}.`)
        });
        
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err)
    })
    
const configuration = new Configuration({
    organization: "org-yqmJkAFryC45q7GGyyXJXKvD",
    apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

// ROUTES:
app.use('/api', apiRoutes);
