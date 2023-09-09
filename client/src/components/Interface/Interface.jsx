import React, { useState } from 'react';
import '../../CSS/Select.css'; // Import your custom CSS for styling
import { useDispatch, useSelector } from 'react-redux';
import { setResponse, setAiEvaluation, selectOpenAIResponse, selectAiEvaluation } from '../../slices/openaiSlice';
import reactHTMLParser from 'react-html-parser';


const Interface = () => {
    const dispatch = useDispatch();
    const response = useSelector(selectOpenAIResponse);
    // this is for later
    const aiEvaluation = useSelector(selectAiEvaluation);

    const [selectedTopic, setSelectedTopic] = useState(''); // Initialize with an empty string
    const [isLoading, setIsLoading] = useState(false); // Add a state variable for loading
    const [userAnswer, setUserAnswer] = useState('1.\n2.\n3.\n4.\n')


    const handleGenerateTopic = async () => {
        if (selectedTopic !== '') {
            setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        };
    };

    // Not doing this yet
    const handleUserAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleUserAnswerSubmit = async () => {
        try{
            const openAIResponse = await fetch(`http://localhost:3333/api/generate-prompt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    topic: selectedTopic,
                    readingExcercise: response,
                    answer: userAnswer,
                }),
            });
            const responseData = await openAIResponse.json();
            // CREATE ACTION TO HANDLE AI'S EVALUATION OF THE USER RESPONSE
            console.log("Evaluation Response: ", responseData.message.content)
            dispatch(setAiEvaluation(responseData.message.content));
        } catch(error){
            console.error('Error fetching response from OpenAI:', error);
        }
    };

    const handleSave = async () => {
        try {
            const saveResponse = await fetch(`http://localhost:3333/api/save-excercise`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    topic: selectedTopic,
                    readingExercise: response,
                    answer: userAnswer,
                    evaluation: aiEvaluation
                }),
            });
    
            if (saveResponse.ok) {
                alert('Exercise saved successfully!');
            } else {
                alert('Error saving exercise. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
            alert('Error saving exercise. Please try again later.');
        }
    }
    const parsedResponse = reactHTMLParser(response);
    const parsedEval = reactHTMLParser(aiEvaluation);

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
                <option value="" disabled defaultValue={''}>Select An Option</option>
                <option value="History">History</option>
                <option value="Science">Science</option>
                <option value="Programming">Programming</option>
                <option value="Math">Mathematics</option>
                <option value="Pop Culture">Pop Culture</option>
                <option value="Psychology">Psychology</option>
                <option value="Sports">Sports</option>
                <option value="Fiction">Fiction</option>
                <option value="Fantasy">Fantasy</option>
            </select>
        </div>
            <div className="submit-btn">
                <button onClick={handleGenerateTopic} className="generate-excercise-btn">📖</button>
            </div>
        </div>

        <div className="response">
            <div className="ai-response">
                {isLoading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    response ? (
                        <p>{parsedResponse}</p>
                    ) : (
                        <div className="empty-response">Waiting for AI response...</div>
                    )
                )}
            </div>
        </div>

        <div className="user-answer">
            <p>Response:</p>
            <textarea
            rows="7" // Adjust the number of rows as needed
            value={userAnswer}
            onChange={handleUserAnswerChange}
            placeholder="Type your answer here..."
            ></textarea>
        </div>
        <div className="submit-answer-btn-container">
            <button onClick={() => console.log("save")} className='save-btn'>Save</button>
            <button onClick={() => console.log("hide reading prompt")} className='recall-btn'>Recall</button>
            <button onClick={handleUserAnswerSubmit} className='submit-answer-btn'>Submit</button>
        </div>
        <div className="solution-response">
            <div className="ai-response">
                {isLoading ? (
                    <div className="loader">Loading...</div>
                ) : (
                    aiEvaluation ? (
                        <p>{parsedEval}</p>
                    ) : (
                        <div className="empty-response">Waiting for AI evaluation...</div>
                    )
                )}
            </div>
        </div>

   </div>
    );  
};

export default Interface;