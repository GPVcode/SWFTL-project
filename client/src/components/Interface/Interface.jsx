import React, { useState } from 'react';
import '../../CSS/Select.css'; // Import your custom CSS for styling
import { useDispatch, useSelector } from 'react-redux';
import { 
    setResponse, 
    setAiEvaluation, 
    selectOpenAIResponse, 
    selectAiEvaluation, 
} from '../../slices/openaiSlice';
import reactHTMLParser from 'react-html-parser';
// import ExerciseList from '../Exercises/ExerciseList';


const Interface = () => {
    const dispatch = useDispatch();
    const response = useSelector(selectOpenAIResponse);
    const aiEvaluation = useSelector(selectAiEvaluation);


    const [selectedTopic, setSelectedTopic] = useState(''); // Initialize with an empty string
    const [isLoading, setIsLoading] = useState(false); // Add a state variable for loading
    const [userAnswer, setUserAnswer] = useState('');
    const [ mode, setMode ] = useState('');

    const handleGenerateTopic = async () => {
        if (selectedTopic !== '' && mode !== '') {
            setIsLoading(true);
    
            if (mode === 'Reading' && selectedTopic !== '') {
                setUserAnswer('1.\n2.\n3.\n4.\n'); // Set userAnswer for Reading mode and valid topic
            } else if(mode === 'Journaling' && selectedTopic !== ''){
                setUserAnswer('');
            }
    
            dispatch(setResponse(''));
            dispatch(setAiEvaluation(''));
    
            try {
                const openAIResponse = await fetch(`https://swift-learnings.onrender.com/api/generate-prompt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        topic: selectedTopic,
                        mode: mode
                    }),
                });
    
                const responseData = await openAIResponse.json();
                dispatch(setResponse(responseData.message.content));
            } catch (error) {
                console.error('Error fetching response from OpenAI:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('Please pick a mode and a topic before generating a response.');
        }
    };

    // Not doing this yet
    const handleUserAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleUserAnswerSubmit = async () => {
        setIsLoading(true);
        try{
            const openAIResponse = await fetch(`https://swift-learnings.onrender.com/api/generate-prompt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    mode: mode,
                    topic: selectedTopic,
                    readingExcercise: response,
                    answer: userAnswer,
                }),
            });
            const responseData = await openAIResponse.json();
            setIsLoading(false);
            // CREATE ACTION TO HANDLE AI'S EVALUATION OF THE USER RESPONSE
            dispatch(setAiEvaluation(responseData.message.content));
        } catch(error){
            console.error('Error fetching response from OpenAI:', error);
        }
    };

    const handleSave = async () => {
        try {
            if(aiEvaluation){
                const saveResponse = await fetch(`https://swift-learnings.onrender.com/api/save-excercise`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        mode: mode,
                        topic: selectedTopic,
                        readingExercise: response,
                        answer: userAnswer,
                        evaluation: aiEvaluation
                    }),
                });
                setMode('');
                setSelectedTopic('');
                setIsLoading(false);
                setUserAnswer('');
                dispatch(setResponse(''));
                dispatch(setAiEvaluation(''));
        
                if (saveResponse.ok) {
                    alert('Exercise saved successfully!');
                } else {
                    alert('Error saving exercise. Please try again later.');
                }
            } else if (!aiEvaluation) {
                alert('Please finish your exercise before saving.')
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
        <div className="content">

            
            <div className="worksheet">
                <header>
                        <h1>Welcome to SWIFT Pocket!</h1>
                </header>
                <div className="response">
                    <div className="ai-response">
                        {
                            response ? (
                                <p>{parsedResponse}</p>
                            ) : (
                                <div className="empty-response">Waiting for AI response...</div>
                            )
                        }
                    </div>
                </div>

                <div className="solution-response">
                    <div className="ai-response">
                        {isLoading ? (
                            <div className="loader">Loading...</div>
                        ) : (
                            aiEvaluation ? (
                                <p>{parsedEval}</p>
                            ) : (
                                <div className="empty-response">AI evaluation...</div>
                            )
                        )}
                    </div>
                </div>

                <div className="select">
                    <div className="mode">
                        <p>Mode:</p>
                        <select
                            className='topic-select'
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                        >
                            <option value="" disabled defaultValue={''}>Select Mode</option>
                            <option value="Reading">Reading</option>
                            <option value="Journaling">Journaling</option>

                        </select>
                    </div>
                    <div className="topic">
                        <p>Topic:</p>
                        { mode !== 'Journaling' ? 
                            <select
                            className='topic-select'
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            >
                                <option value="" disabled defaultValue={''}>Select Topic</option>
                                <option value="History">History</option>
                                <option value="Science">Science</option>
                                <option value="Programming">Programming</option>
                                <option value="Math">Mathematics</option>
                                <option value="Pop Culture">Pop Culture</option>
                                <option value="Psychology">Psychology</option>
                                <option value="Sports">Sports</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Generate a random topic">Random</option>
                            </select> :
                            <select 
                            className='journal-topic-select'
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            >
                                <option value="" disabled defaultValue={''}>Select Topic</option>
                                <option vaue="my day">My Day</option>
                                <option vaue="Gratitude">Gratitude</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Resilience">Resilience</option>
                                <option value="Creativity">Creativity</option>
                                <option value="Serenity">Serenity</option>
                                <option value="Growth">Growth</option>
                                <option value="Harmony">Harmony</option>
                                <option value="Discovery">Discovery</option>
                                <option value="Inspiration">Inspiration</option>
                                <option value="Joy">Joy</option>
                            </select>
                        }
                    </div>
                    <div className="submit-btn">
                        <button onClick={handleGenerateTopic} className="generate-excercise-btn">📖</button>
                        <button 
                            onClick={handleSave} 
                            // disabled={!aiEvaluation}
                            className='save-btn'
                        >
                            ➕
                        </button>
                        {/* <button onClick={() => console.log("hide reading prompt")} className='recall-btn'>👁️‍🗨️</button> */}
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
                    <div className="submit-answer-btn-container">
                        <button onClick={handleUserAnswerSubmit} className='submit-answer-btn'>Submit</button>
                    </div>
                </div>
            </div>

            <div className="side">
            <div className="legend">
                        <h2>Legend</h2>
                        <p>
                            <strong>Mode:</strong> Choose a mode for the exercise.
                        </p>
                        <p>
                            <strong>Topic:</strong> Select a topic based on the chosen mode.
                        </p>
                        <p className='legend-generate-excercise-btn'>
                            📖: Generate a new exercise prompt.
                        </p>
                        <p className='legend-save-btn'>
                        ➕: Save the exercise.
                        </p>
            </div>
            <div className="quote">
                <h4>
                "Education is not the learning of facts, but the training of the mind to think." <br/>-Albert Einstein
                </h4>
                    
            </div>
            </div>

        </div>

        

   </div>
    );  
};

export default Interface;