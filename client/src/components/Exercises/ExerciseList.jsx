import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSavedExercises, selectSavedExercises } from '../../slices/exerciseSlice';
import '../../CSS/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import StartExerciseBtn from './StartExerciseBtn';

const ExerciseList = () => {
    const dispatch = useDispatch();
    const savedExercises = useSelector(selectSavedExercises);

    const [ selectedExercises, setSelectedExercises ] = useState([]);

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

    const toggleSelection = (exercise) => {
      const isSelected = selectedExercises.includes(exercise);
    
      if(isSelected){
        setSelectedExercises(selectedExercises.filter((ex) => ex._id !== exercise._id));
      } else {
        setSelectedExercises([...selectedExercises, exercise]);
      }
    };

    const toggleSelectAll = () => {
      const allSelected = selectedExercises.length === savedExercises.length;
    
      if(allSelected){
        setSelectedExercises([]);
        
      } else {
        setSelectedExercises([...savedExercises]);
      }
    }

    const handleDelete = () => {
      if (window.confirm('Are you sure you want to delete the selected exercises?')) {
        // Implement the delete action here
    }    };

    return (
      <>
      <div className="list-title">
        <h1>Swift Learnings List</h1>
      </div>
      <div className='list-wrapper'>
   

        <div className="exercise-list-container">
          <div className="button-column">
            <StartExerciseBtn />
          </div>
        </div>
        <div className='reading-list'>
            <div className="control-row">
                  <input
                    type="checkbox"
                    id="select-all"
                    className='select-all-checkbox checkbox'
                    checked={selectedExercises.length === savedExercises.length}
                    onChange={() => toggleSelectAll()}
                  />
                  {selectedExercises.length > 0 && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="trash-icon"
                      onClick={handleDelete}
                    />
                  )}
            </div>
          
          <ul>
            {savedExercises.map((exercise) => (
              <div className="exercise-selection" key={exercise._id}>
                    <input
                      type="checkbox"
                      className='checkbox'
                      checked={selectedExercises.includes(exercise)}
                      onChange={() => toggleSelection(exercise)}
                    />
                  <Link to={`/exercises/${exercise._id}`} className="exercise-link">
                    <div className="left-content">
                      <span className='topic'>{exercise.topic}</span>
                      <p className="snippet">
                        {(() => {
                          const exerciseText = exercise.readingExercise;

                          let truncatedText;
                          if (exerciseText.includes('<') && exerciseText.indexOf('<') < 50) {
                            truncatedText = exerciseText.substring(0, exerciseText.indexOf('<'));
                          } else {
                            truncatedText = exerciseText.substring(0, 50);
                          }
                          return truncatedText
                        })()}
                      </p>  
                    </div>     
                    <div className="right-content">
                      <span className='date'>{formatDate(exercise.dateCreated)}</span>
                    </div>             
                  </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
      </>
      );
    };
    

export default ExerciseList
