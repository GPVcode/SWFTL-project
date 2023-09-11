import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSavedExercises, selectSavedExercises } from '../../slices/exerciseSlice';
import '../../CSS/List.css';

const ExerciseList = () => {
    const dispatch = useDispatch();
    const savedExercises = useSelector(selectSavedExercises);

    // console.log('saved: ', savedExercises[0].readingExercise)
    useEffect(() => {
        const fetchSavedExercises = async () => {
            try{
                const response = await fetch('http://localhost:3333/api/exercises');
                // console.log("excerise list response request: ", response)
                if(response.ok){
                    const data = await response.json();
                    dispatch(setSavedExercises(data));
                } else {
                    console.error('Failed to fetch saved exercises');
                }
            } catch (error){
                console.error('Error fetching saved exercises:', error);
            }
        };

        fetchSavedExercises();
    }, [dispatch]);
    
    const formatDate = (dateString) => {
      const sameDayOptions = { month: 'long', day: 'numeric' };
      const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
      const date = new Date(dateString);
      const now = new Date();

      if (
        date.getYear() === now.getYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      ) {
        // Same day, show time
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleTimeString('en-US', options);
      } else {
        // Different day, show date
        const sameDayOptions = { month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', sameDayOptions);
      }
    };
    return (
        <div className='reading-list'>
          <h1>Reading Exercises</h1>
          <ul>
            {savedExercises.map((exercise) => (
              <div className="exercise-selection" key={exercise._id}>
                  <Link to={`/exercises/${exercise._id}`} className="exercise-link">
                    <div className="left-content">
                      <span className='topic'>{exercise.topic}</span>
                      <p className="snippet">{exercise.readingExercise.substring(0,50)} ...</p>
                    </div>     
                    <div className="right-content">
                      <span className='date'>{formatDate(exercise.dateCreated)}</span>
                    </div>             
                  </Link>
              </div>
            ))}
          </ul>
        </div>
      );
    };
    

export default ExerciseList
