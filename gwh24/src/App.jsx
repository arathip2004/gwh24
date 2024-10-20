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
import { v4 as uuidv4 } from 'uuid';  // Import UUID generation
import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore'; // Make sure to import getDocs
import { db } from './firebaseConfig'; // Adjust the path as necessary

function App() {
    const [cookies, setCookie] = useCookies(['userUUID']);
    const [existingUser, setExistingUser] = useState(null);
    const sentiment = new Sentiment();
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState(null);
    const [humanReadable, setHumanReadable] = useState('');

    // Function to add sentiment data to Firestore
    const addSentiment = async (interpretation) => {
        try {
            const userUUID = cookies.userUUID;
            const userCollectionRef = collection(db, 'users', userUUID, 'sentiments');
            const snapshot = await getDocs(userCollectionRef);
            let alreadySubmitted = false;

            const currDate = new Date();
            currDate.setHours(0, 0, 0, 0); // Normalize to only date

            // Loop through documents to check if an entry exists for the current date
            snapshot.forEach((doc) => {
                const docData = doc.data();
                const docDate = docData.date.toDate();  // Assuming Firestore timestamp
                docDate.setHours(0, 0, 0, 0);

                // Compare the document date with the current date
                if (docDate.getTime() === currDate.getTime()) {
                    alreadySubmitted = true;
                }
            });

            if (alreadySubmitted) {
                alert('already submitted');
            } else {
                const docRef = doc(userCollectionRef, currDate.toISOString());
                // Store sentiment analysis with date and interpretation
                await setDoc(docRef, {
                    sentiment: interpretation,
                    date: currDate,
                });
            }
        } catch (error) {
            console.error('Error adding sentiment to Firestore:', error);
        }
    };

    // Function to check if the user exists or is new
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let userUUID = cookies.userUUID;

                if (!userUUID) {
                    // If no UUID is stored in cookies, generate a new one
                    userUUID = uuidv4();
                    setCookie('userUUID', userUUID, { path: '/' });
                }

                // Check if the user already exists in Firestore
                const userCollectionRef = collection(db, 'users', userUUID, 'sentiments');
                const snapshot = await getDocs(userCollectionRef);

                if (!snapshot.empty) {
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

    // Function to interpret sentiment based on score
    function interpretSentiment(score) {
        if (score > 5) return 'Strongly Positive';
        if (score > 0) return 'Positive';
        if (score === 0) return 'Neutral';
        if (score > -5) return 'Negative';
        return 'Strongly Negative';
    }

    // Handle form submission and sentiment analysis
    function handleSubmit() {
        const analysis = sentiment.analyze(userInput);
        const score = analysis.score;
        setResult(score);
        const interpretation = interpretSentiment(score);
        setHumanReadable(interpretation);
        addSentiment(interpretation); // Call function to add sentiment to Firestore
    }

    // Initial view for asking how the user is feeling today
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
