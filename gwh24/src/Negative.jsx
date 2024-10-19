import './styles.css'
import React, { useState, useEffect } from 'react';

function Negative() {
    const [meme, setMeme] = useState(null);
    const fetchMeme = async () => {
        try {
          const response = await fetch('https://meme-api.com/gimme/wholesomememes');
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
          fetchMeme();
  }, []);

    
    return (
        <div>
        <h1>Negative Sentiment Detected</h1>
        <>{meme ? (
            <div>
              <img src={meme.url} alt={meme.title} style={{maxHeight: '200px'}} />
            </div>
          ) : (
            <p>Loading meme...</p>
          )}
          </>
          <button onClick={fetchMeme}>Generate New Meme</button>
          </div>
    )  
}

export default Negative