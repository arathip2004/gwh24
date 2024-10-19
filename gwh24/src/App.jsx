import { useState } from 'react'
import './App.css'
import Sentiment from 'sentiment';

function App() {
  const sentiment = new Sentiment();

  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [humanReadable, setHumanReadable] = useState('');
  const [quote, setQuote] = useState('');

  function fetchQuote() {
    const url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    return fetch(url)
        .then(response => response.json())
        .then(data => data.quoteText)
        .catch(error => {
          console.error("Error fetching quote:", error);
          return "Could not fetch quote. ";
        });
  }

  function interpretSentiment(score) {
    if (score > 0.5) return "Strongly Positive";
    if (score > 0) return "Positive";
    if (score === 0) return "Neutral";
    if (score > -0.5) return "Negative";
    return "Strongly Negative";
  }

async function handleSubmit() {
    const analysis = sentiment.analyze(userInput); // Analyzing user input
    const score = analysis.score; // Extracting the sentiment score
    setResult(score);
    const interpretation = interpretSentiment(score)
    setHumanReadable(interpretation);

    if (interpretation === "Strongly Negative") {
      const fetchedQuote = await fetchQuote();
      setQuote(fetchedQuote);
    } else {
      setQuote('');
    }

  }


  return (
    <>
      <h1>
        How are you feeling today?
      </h1>
      <div className = "container">
      <div className="search">
  <input placeholder="Search" className="search__input" type="text" onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === "Return") {
      handleSubmit();
    }}}/>
  <button className="search__button" onClick={handleSubmit}>
    <svg
      viewBox="0 0 16 16"
      className="bi bi-arrow-right"
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
      {quote && (<div>
            <p>Affirmation: &#34;{quote}&#34; </p> {/* Display the fetched affirmation */}
          </div>
      )}
    </>
  )
}

export default App




