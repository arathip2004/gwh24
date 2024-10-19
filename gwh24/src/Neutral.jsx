import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "./firebaseConfig"; // Adjust the path as necessary
import { doc, getDoc } from "firebase/firestore";
import "./styles.css";

function Neutral() {
    const [songs, setSongs] = useState([]);
    const [randomSong, setRandomSong] = useState(null);
    const [token, setToken] = useState(null); // State for storing the token
    const genres = ["ambient", "lo-fi", "chill", "instrumental"]; // List of genres

    useEffect(() => {
        const fetchToken = async () => {
            const tokenDoc = await getDoc(doc(db, "tokens", "spotify")); // Adjust collection and document names if necessary

            if (tokenDoc.exists()) {
                const tokenData = tokenDoc.data();
                setToken(tokenData.token); // Assuming the token is stored as 'token' in Firestore
                console.log("Spotify Token from Firestore:", tokenData.token);
                fetchSongs(tokenData.token); // Call fetchSongs with the token
            } else {
                console.error("No token document found!");
            }
        };

        const fetchSongs = async (token) => {
            const allSongs = []; // Array to hold songs from all genres

            // Fetch songs for each genre
            for (const genre of genres) {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        q: `genre:${genre}`, // Use the genre for fetching songs
                        type: "track",
                    },
                };

                try {
                    const response = await axios.get("https://api.spotify.com/v1/search", config);
                    allSongs.push(...response.data.tracks.items); // Add the fetched songs to the allSongs array
                } catch (error) {
                    console.error(`Error fetching songs for genre ${genre}:`, error);
                }
            }

            setSongs(allSongs); // Update state with all songs
            getRandomSong(allSongs); // Get a random song from the combined results
        };

        fetchToken(); // Call fetchToken when component mounts
    }, []);

    const getRandomSong = (songs) => {
        if (songs.length === 0) return; // Check if there are songs
        const randomIndex = Math.floor(Math.random() * songs.length);
        setRandomSong(songs[randomIndex]);
    };

    return (
        <div className="App">
            <h1>Calm Music</h1>
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
