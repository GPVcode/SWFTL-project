import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSavedExercises } from '../../slices/exerciseSlice';

const ExerciseDetail = () => {
  const { id } = useParams();
  const savedExercises = useSelector(selectSavedExercises);
  const exercise = savedExercises.find(ex => ex._id === id);

  
  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  return (
    <div>
      <h2>{exercise.topic}</h2>
      <p>Date Created: {exercise.dateCreated}</p>
      <div>{exercise.readingExercise}</div>
      <div>{exercise.answer}</div>
      <div>{exercise.evaluation}</div>
    </div>
  );
};

export default ExerciseDetail;
