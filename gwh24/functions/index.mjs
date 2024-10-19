import functions from 'firebase-functions';
import fetch from 'node-fetch';
import admin from 'firebase-admin';

// Initialize the Firebase Admin SDK
admin.initializeApp();

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const AUTH_HEADER = 'Basic YWZmNGZjODM1NjBjNDFmZGI4ZWVkOGI0YWJjMzJjMTQ6OGEyM2JkZjE3YjAzNGM5OWExMjY3YzkwYjYzYjAyNDU=';

export const getSpotifyToken = functions.pubsub.schedule('*/5 * * * *').onRun(async (context) => {
    try {
        const response = await fetch(SPOTIFY_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Authorization': AUTH_HEADER,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ grant_type: 'client_credentials' }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Access Token:', data.access_token);

        // Store the token in Firestore
        await admin.firestore().collection('tokens').doc('spotify').set({ token: data.access_token });

    } catch (error) {
        console.error('Failed to fetch Spotify token:', error);
    }
});
