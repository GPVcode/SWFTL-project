import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../CSS/List.css';

const StartExerciseBtn = () => {
  return (
    <div className='newBtn-container'>
        <Link to="/interface">
            <button className='new-btn'>
                <FontAwesomeIcon icon={faPlus} className='plus-icon' />
                New
            </button>
        </Link>
    </div>
  )
}

export default StartExerciseBtn
