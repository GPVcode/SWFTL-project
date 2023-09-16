import React from 'react';
import { useSelector } from 'react-redux';
import { selectSavedExercises } from '../../slices/exerciseSlice';


const InterfaceList = () => {
    const savedExercises = useSelector(selectSavedExercises);
    console.log(savedExercises)

  return (
    <div>
      
    </div>
  )
}

export default InterfaceList
