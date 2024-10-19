import './styles.css'
import React, { useState, useEffect } from 'react'; // Import React and useState

function StrongPositive() {
    const [joke, setJoke] = useState('');

  useEffect(() => {
    // Fetch a dad joke from the API
    const fetchJoke = async () => {
      try {
        const response = await fetch('https://icanhazdadjoke.com/', {
          headers: {
            Accept: 'text/plain',
          },
        });
        const text = await response.text();
        setJoke(text);
      } catch (error) {
        console.error('Error fetching joke:', error);
      }
    };

    fetchJoke();
  }, []);

    return (
        <div>
        <p>{joke ? joke : 'Loading joke...'}</p>
      </div>
    );
  }

export default StrongPositive