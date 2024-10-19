import { useState } from 'react'
import './App.css'
import Sentiment from 'sentiment';

function App() {
  const sentiment = new Sentiment();

  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [humanReadable, setHumanReadable] = useState('');

  function interpretSentiment(score) {
    if (score > 0.5) return "Strongly Positive";
    if (score > 0) return "Positive";
    if (score === 0) return "Neutral";
    if (score > -0.5) return "Negative";
    return "Strongly Negative";
  }

  function handleSubmit() {
    const analysis = sentiment.analyze(userInput); // Analyzing user input
    const score = analysis.score; // Extracting the sentiment score
    setResult(score);
    setHumanReadable(interpretSentiment(score)); // Interpreting score
  }


  return (
    <>
      <h1>
        How are you feeling today?
      </h1>
      <div class="input-wrapper">
        <input type="text" placeholder="Type here..." name="text" class="input"  value={userInput} onChange={e => setUserInput(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button> {/* Button to trigger submission */}      
      </div>
      {result !== null && (
        <div>
          <p>Sentiment Score: {result}</p>
          <p>Interpretation: {humanReadable}</p>
        </div>
      )}
    </>
  )
}

export default App
