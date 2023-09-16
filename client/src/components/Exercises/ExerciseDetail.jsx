import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSavedExercises } from '../../slices/exerciseSlice';
import reactHTMLParser from 'html-react-parser';
import '../../CSS/ExerciseDetail.css';

const ExerciseDetail = () => {
  const { id } = useParams();
  const savedExercises = useSelector(selectSavedExercises);
  const exercise = savedExercises.find(ex => ex._id === id);

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  let modifiedReadingExercise = exercise.readingExercise.replace(
    /Paragraph \d+: /g,  // Remove paragraph labels
    ''
  ).replace(
    /Questions:/g,
    '<div style="font-size: 1.1em; font-weight: bold; margin-bottom: 10px; font-family: \'Libre Baskerville\', serif;">Questions:</div>'
  );

  const parsedReadingExercise = reactHTMLParser(modifiedReadingExercise);

  const parsedEval = exercise.evaluation
  .split(/\d+\./)
  .filter(Boolean)
  .map((segment, index) => {
    const cleanedSegment = segment.replace(/<br\s*[/]?>/gi, ' ');
    return (
      <div key={index} className="feedback-sentence">
        {index + 1}. {reactHTMLParser(cleanedSegment.trim())}
      </div>
    );
  });

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




  return (
    <div className='detail-container'>
          <div className="list-title">
            <h2>{exercise.topic}</h2>
          </div>

          <div className="exercise-info">
            <p><strong>Date Created:</strong> {formatDate(exercise.dateCreated)}</p>
          </div>

          <div className="exercise-content">

              <div className="section">
                <h3>Reading Exercise</h3>
                <div className="reading-exercise">{parsedReadingExercise}</div>
              </div>
              <div className="section answer">
                <h3>Answer</h3>
                {exercise.answer.split(/\d+\.\s+/).filter(Boolean).map((item, index) => (
                  <div key={index}>
                    {`${index + 1}. ${item.trim()}`}
                  </div>
                ))}
              </div>
              <div className="section">
                <h3>AI Feedback</h3>
                <div className="evaluation">{parsedEval}</div>
              </div>

          </div>

    </div>
  );
};

export default ExerciseDetail;
