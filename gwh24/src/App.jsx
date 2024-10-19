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
      <div class = "container">
      <div class="search">
  <input placeholder="Search" class="search__input" type="text" onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === "Return") {
      handleSubmit();
    }}}/>
  <button class="search__button" onClick={handleSubmit}>
    <svg
      viewBox="0 0 16 16"
      class="bi bi-arrow-right"
      fill="currentColor"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M10.854 8.354a.5.5 0 0 0 0-.708l-4-4a.5.5 0 1 0-.708.708L9.293 7.5H2.5a.5.5 0 0 0 0 1h6.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
      />
    </svg>
  </button>
</div>
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
