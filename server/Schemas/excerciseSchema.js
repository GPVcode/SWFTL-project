import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    mode: String,
    topic: String,
    readingExercise: String,
    answer: String,
    evaluation: String,
    dateCreated: { type: Date, default: Date.now },
    
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise