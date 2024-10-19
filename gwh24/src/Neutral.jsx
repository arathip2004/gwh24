import './styles.css'
import React, { useState } from 'react'; // Import React and useState

function Neutral() {
const [quote, setQuote] = useState('');
    async function fetchQuote() {
        const url = "https://favqs.com/api/qotd";
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      
        try {
          const response = await fetch(proxyUrl);
          const data = await response.json();
          const quoteData = JSON.parse(data.contents); // Parse the JSON string
          return quoteData.quote.body; // Access the quote text
        } catch (error) {
          console.error("Error fetching quote:", error.message);
          return "Could not fetch quote.";
        }
      }

      async function handleSubmit() {
        const fetchedQuote = await fetchQuote();
        setQuote(fetchedQuote);
        }

        return (
            <>
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

export default Neutral