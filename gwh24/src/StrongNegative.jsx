import './styles.css';
import React, { useState, useEffect } from 'react'; // Only import useState and useEffect
import Quotes from 'inspirational-quotes'; // Import the inspirational quotes package

function StrongNegative() {
    const [quote, setQuote] = useState('');

    // Load the quote when the component is mounted
    useEffect(() => {
        fetchNewQuote();
    }, []);

    const fetchNewQuote = () => {
        const fetchedQuote = Quotes.getQuote();
        console.log("Fetched Quote:", fetchedQuote);
        setQuote(fetchedQuote.text);
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
            <button onClick={() => {
                console.log("Button Clicked"); // Log when the button is clicked
                fetchNewQuote();
            }}>
                Generate New Quote
            </button>
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