import './styles.css'
import React, { useState, useEffect } from 'react'; // Import React and useState

function StrongPositive() {
    const [meme, setMeme] = useState(null);
    const [joke, setJoke] = useState('');

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
    const fetchMeme = async () => {
        try {
          const response = await fetch('https://meme-api.com/gimme');
          const json = await response.json();
          setMeme({
            title: json.title,
            url: json.url,
            postLink: json.postLink,
            subreddit: json.subreddit,
            preview: json.preview ? json.preview[0] : null, // First preview image
          });
        } catch (error) {
          console.error('Error fetching meme:', error);
        }
      };
  useEffect(() => {
    fetchJoke();
    fetchMeme();
  }, []);

    return (
        <div>
            <h1>Strongly Positive Sentiment Detected</h1>
            <p>We're so glad, you seem really happy. Here's a joke to keep your smile on your face:</p>
        <p>{joke ? joke : 'Loading joke...'}</p>
        <button onClick={fetchJoke}>Generate New Joke</button>
      {meme ? (
        <div>
          <img src={meme.url} alt={meme.title} style={{ maxHeight: '250px', marginTop: '10px'}} />
        </div>
      ) : (
        <p>Loading meme...</p>
      )}
      <button onClick={fetchMeme}>Generate New Meme</button>
      </div>
    );
  }

export default StrongPositive