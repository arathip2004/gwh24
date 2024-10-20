import './App.css';
import Sentiment from 'sentiment';
import StrongPositive from './StrongPositive';
import Positive from './Positive';
import Neutral from './Neutral'; // Neutral component now handles quotes
import Negative from './Negative';
import StrongNegative from './StrongNegative';
import TextAnimation from './TextAnimation';
import FlowerFooter from './FlowerFooter';
import { useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';  // Import UUID generation
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Adjust the path as necessary

function App() {
    const [cookies, setCookie] = useCookies(['userUUID']);
    const [existingUser, setExistingUser] = useState(null);
    const sentiment = new Sentiment();
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState(null);
    const [humanReadable, setHumanReadable] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let userUUID = cookies.userUUID;

                if (!userUUID) {
                    // If no UUID is stored in cookies, generate a new one
                    userUUID = uuidv4();
                    setCookie('userUUID', userUUID, { path: '/' });
                }

                // Check if this user collection exists (you might need to store something initially in Firebase to check)
                const userCollectionRef = collection(db, 'users', userUUID, 'sentiments');
                const firstDoc = await getDoc(doc(userCollectionRef, 'checkIfExists'));

                if (firstDoc.exists()) {
                    console.log('Welcome back, user');
                    setExistingUser(true);
                } else {
                    console.log('New user detected.');
                    setExistingUser(false);
                }
            } catch (error) {
                console.error('Error fetching user or adding to Firestore:', error);
            }
        };

        fetchUser();
    }, [cookies, setCookie]);

    const addSentiment = async (interpretation) => {
        const userUUID = cookies.userUUID;

        // Create a reference to the user's collection
        const userCollectionRef = collection(db, 'users', userUUID, 'sentiments');

        // Use the current date and time as the document ID for each sentiment entry
        const date = new Date();
        const docRef = doc(userCollectionRef, date.toISOString());

        // Store sentiment analysis with date and interpretation
        await setDoc(docRef, {
            sentiment: interpretation,
            date: date,
        });
    };

    function interpretSentiment(score) {
        if (score > 5) return 'Strongly Positive';
        if (score > 0) return 'Positive';
        if (score === 0) return 'Neutral';
        if (score > -5) return 'Negative';
        return 'Strongly Negative';
    }

    function handleSubmit() {
        const analysis = sentiment.analyze(userInput);
        const score = analysis.score;
        setResult(score);
        const interpretation = interpretSentiment(score);
        setHumanReadable(interpretation);
        addSentiment(interpretation);
    }

    if (existingUser !== null && result === null) {
        return (
            <>
                <h1>How are you feeling today?</h1>
                <TextAnimation />

                <div className="container">
                    <div className="search">
                        <input
                            placeholder=""
                            className="search__input"
                            type="text"
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                        />
                        <button className="search__button" onClick={handleSubmit}>
                            <svg
                                viewBox="0 0 16 16"
                                className="bi bi-arrow-right"
                                fill="currentColor"
                                height="16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.854 8.354a.5.5 0 0 0 0-.708l-4-4a.5.5 0 1 0-.708.708L9.293 7.5H2.5a.5.5 0 0 0 0 1h6.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {result !== null && (
                    <div>
                        <p>Sentiment Score: {result}</p>
                        <p>Interpretation: {humanReadable}</p>
                    </div>
                )}
                <FlowerFooter />
            </>
        );
    } else if (humanReadable === 'Strongly Positive') {
        return <StrongPositive />;
    } else if (humanReadable === 'Positive') {
        return <Positive />;
    } else if (humanReadable === 'Neutral') {
        return <Neutral />;
    } else if (humanReadable === 'Negative') {
        return <Negative />;
    } else if (humanReadable === 'Strongly Negative') {
        return <StrongNegative />;
    }
}

export default App;
