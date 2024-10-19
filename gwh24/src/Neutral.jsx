import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
function Neutral() {
    const [songs, setSongs] = useState([]);
    const [randomSong, setRandomSong] = useState(null);
  
    useEffect(() => {
      const fetchSongs = async () => {
        const token = import.meta.env.VITE_SPOTIFY_TOKEN;
        console.log("Spotify Token:", token); // Check if the token is loaded

    if (!token) {
      console.error("No token found! Please check your .env file.");
      return;
    }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: "genre:ambient", // Changed to ambient for calm music
            type: "track",
          },
        };
  
        try {
          const response = await axios.get(
            "https://api.spotify.com/v1/search",
            config
          );
          setSongs(response.data.tracks.items);
          getRandomSong(response.data.tracks.items);
        } catch (error) {
          console.error("Error fetching songs from Spotify:", error);
        }
      };
  
      fetchSongs();
    }, []);
  
    const getRandomSong = (songs) => {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setRandomSong(songs[randomIndex]);
    };
  
    return (
      <div className="App">
        <h1>Calm Music - Ambient</h1>
        {randomSong ? (
          <div>
            <h2>{randomSong.name}</h2>
            <p>Artist: {randomSong.artists[0].name}</p>
            <a href={randomSong.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              Listen on Spotify
            </a>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={() => getRandomSong(songs)}>Get Another Song</button>
      </div>
    );
  }

export default Neutral;
