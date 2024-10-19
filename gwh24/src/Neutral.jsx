import './styles.css';
import React, { useState, useEffect } from 'react';
import Quotes from 'inspirational-quotes'; // Import the inspirational quotes package

function Neutral() {
    const [quote, setQuote] = useState(''); // State to store the fetched quote

    // Load the quote when the component is mounted
    useEffect(() => {
        const fetchedQuote = Quotes.getQuote(); // Use the package to get a random quote
        setQuote(fetchedQuote.text); // Set the quote text in state
    }, []); // Empty dependency array ensures this runs only once on component mount

    
    return (
        <div className="neutral-container">
            <h1>Neutral Sentiment Detected</h1>
            <p>Here’s an inspirational quote for you:</p>
            {quote ? (
                <div>
                    <p className="quote">"{quote}"</p> {/* Display the fetched quote */}
                </div>
            ) : (
                <p>Loading quote...</p>
            )}
        </div>
    );
}

export default Neutral;
