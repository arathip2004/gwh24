import './styles.css';
import React, { useState, useEffect } from 'react'; // Only import useState and useEffect
import Quotes from 'inspirational-quotes'; // Import the inspirational quotes package

function StrongNegative() {
    const [quote, setQuote] = useState(''); // State to store the fetched quote

    // Load the quote when the component is mounted
    useEffect(() => {
        fetchNewQuote();
    }, []); // Empty dependency array ensures this runs only once on component mount

    const fetchNewQuote = () => {
        const fetchedQuote = Quotes.getQuote(); // Get a random quote
        console.log("Fetched Quote:", fetchedQuote); // Log the fetched quote
        setQuote(fetchedQuote.text); // Set the quote text in state
    };

    return (
        <div className="neutral-container">
            <h1>Strongly Negative Sentiment Detected</h1>
            <p>You seem very troubled. Here’s an inspirational quote for you:</p>
            {quote ? (
                <div>
                    <p className="quote">"{quote}"</p> {/* Display the fetched quote */}
                </div>
            ) : (
                <p>Loading quote...</p>
            )}
            <button onClick={fetchNewQuote}>Generate New Quote</button>
            <p>Also, here are some resources that might help.</p>
            <ul>
                <li>UVA caps - https://www.studenthealth.virginia.edu/mental-health/getting-started-scheduling</li>
                <li>Hoos Well - https://rec.virginia.edu/hoos-well</li>
                <li>Timely Care - https://www.studenthealth.virginia.edu/mental-health/our-services/timelycare</li>
            </ul>
        </div>
    );
}

export default StrongNegative;