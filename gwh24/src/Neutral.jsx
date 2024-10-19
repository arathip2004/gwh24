import './styles.css';
import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect

function Neutral() {
  const [quote, setQuote] = useState(''); // State for storing the quote

  // Fetch the quote when the component mounts
  useEffect(() => {
    async function fetchQuote() {
      const url = "https://favqs.com/api/qotd";
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

      try {
        const response = await fetch(proxyUrl);
        const data = await response.json();
        const quoteData = JSON.parse(data.contents); // Parse the JSON string
        setQuote(quoteData.quote.body); // Set the quote in state
      } catch (error) {
        console.error("Error fetching quote:", error.message);
        setQuote("Could not fetch quote.");
      }
    }

    fetchQuote(); // Call the function to fetch the quote
  }, []); // Empty dependency array to run only once on component mount

  return (
    <>
      {quote && (
        <div>
          <p>Affirmation: &#34;{quote}&#34;</p> {/* Display the fetched affirmation */}
        </div>
      )}
    </>
  );
}

export default Neutral;