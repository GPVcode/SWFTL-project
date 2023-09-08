import React, { useState } from 'react';
import '../../CSS/Select.css'; // Import your custom CSS for styling
import { useDispatch, useSelector } from 'react-redux';
import { setResponse, setUserAnswer, selectOpenAIResponse, selectUserAnswer } from '../../slices/openaiSlice';

const Interface = () => {
    const dispatch = useDispatch();
    const response = useSelector(selectOpenAIResponse);
    // this is for later
    const userAnswer = useSelector(selectUserAnswer);

    const [selectedTopic, setSelectedTopic] = useState(''); // Initialize with an empty string

    const handleGenerateTopic = async () => {
        if (selectedTopic !== '') {
        // Replace with your actual OpenAI API call
            try {
                const openAIResponse = await fetch(`http://localhost:3333/api/generate-prompt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ topic: selectedTopic }),
                });
                const responseData = await openAIResponse.json();
                dispatch(setResponse(responseData.message.content));
            } catch (error) {
                console.error('Error fetching response from OpenAI:', error);
            }
        };
    };

    // Not doing this yet
    const handleUserAnswerChange = (event) => {
        dispatch(setUserAnswer(event.target.value));
    };
    
  return (
   <div className="app-container">
        <header>
                <h1>Welcome to SWFT Pocket!</h1>
        </header>
        <div className="select">
        <div className="topic">
            <p>I want to read about</p>
            <select
                className='topic-select'
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
            >
                <option value="Any">Any</option>
                <option value="History">History</option>
                <option value="Science">Science</option>
                <option value="Programming">Programming</option>
                <option value="Nature">Nature</option>
                <option value="Fiction">laksjdfwaejoeisdaf</option>
            </select>
        </div>
            <div className="submit-btn">
                <button onClick={handleGenerateTopic} className="generate-excercise-btn">📖</button>
            </div>
        </div>

        <div className="response">
            <div className="ai-response">
                {response ? (
                    <p>{response}</p>
                ) : (
                    <div className="empty-response">Waiting for AI response...</div>
                )}
            </div>
        </div>

        <div className="user-answer">
        <p>Response:</p>
        <textarea
          rows="10" // Adjust the number of rows as needed
          value={userAnswer}
          onChange={handleUserAnswerChange}
          placeholder="Type your answer here..."
        ></textarea>
      </div>
   </div>
    );  
};

export default Interface;