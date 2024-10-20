import './App.css';
import Sentiment from 'sentiment';
import StrongPositive from './StrongPositive';
import Positive from './Positive';
import Neutral from './Neutral'; // Neutral component now handles quotes
import Negative from './Negative';
import StrongNegative from './StrongNegative';
import TextAnimation from './TextAnimation'
import FlowerFooter from './FlowerFooter';
import { useState, useEffect } from "react";
/*import { collection, getDocs } from 'firebase/firestore/lite';*/
import axios from "axios";
import { db } from "./firebaseConfig"; // Adjust the path as necessary

import { collection, doc, getDoc, setDoc } from "firebase/firestore";


function App() {


    const [ip, setIP] = useState("");
    const [existingUser, setExistingUser] = useState(null);


    const getIP = async () => {

      
    };

    const addSentiment = async (interpretation) =>{
      const userDocRef = doc(db, "users", ip); // 'users' is a collection where each document is an IP
      

      await setDoc(userDocRef, {
        sentiment: interpretation,
        date: new Date()
      });

    }

    useEffect(() => {
        const fetchUser = async () => {
          try {
            // Fetch the user's IP address
            const res = await axios.get("https://api.ipify.org/?format=json");
            const ip = res.data.ip;
            console.log("User IP:", ip);
      
            setIP(ip); // Save the IP in the state
            
            // Use the IP address as part of the document (not collection) for user identification
            const userDocRef = doc(db, "users", ip); // 'users' is a collection where each document is an IP
            
            const userDoc = await getDoc(userDocRef); // Check if the document for this IP exists
      
            if (userDoc.exists()) {
              // User document exists
              console.log("Welcome back, user");
              setExistingUser(true);
            } else {

              const subcollectionRef = collection(userDoc, "entries"); 

              // New user, add their info
              try {
                const docRef = await addDoc(subcollectionRef, {"name": firstDoc});
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }

              setExistingUser(false);
            }
          } catch (error) {
            console.error("Error fetching user or adding to Firestore:", error);
          }
        };
      
        fetchUser();

        const addDataToSubcollection = async (data) => {
          
        }
        addDataToSubcollection();
      }, []);      

    const sentiment = new Sentiment();

    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState(null);
    const [humanReadable, setHumanReadable] = useState('');

    function interpretSentiment(score) {
        if (score > 5) return "Strongly Positive";
        if (score > 0) return "Positive";
        if (score === 0) return "Neutral";
        if (score > -5) return "Negative";
        return "Strongly Negative";
    }

    function handleSubmit() {
        const analysis = sentiment.analyze(userInput); // Analyzing user input
        const score = analysis.score; // Extracting the sentiment score
        setResult(score);
        const interpretation = interpretSentiment(score);
        setHumanReadable(interpretation);
        addSentiment(interpretation);
    }


    if(existingUser != null && result == null) {
        return (
            <>
                <h1>
                    How are you feeling today?
                </h1>

                <TextAnimation/>

                <div className="container">
                    <div className="search">
                        <input
                            placeholder=""
                            className="search__input"
                            type="text"
                            onChange={e => setUserInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === "Return") {
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
                <FlowerFooter/>
            </>
        );
    } else if(humanReadable === "Strongly Positive") {
        return <StrongPositive />;
    } else if(humanReadable === "Positive") {
        return <Positive />;
    } else if(humanReadable === "Neutral") {
        return <Neutral />; // Neutral component handles quote display
    } else if(humanReadable === "Negative") {
        return <Negative />;
    } else if(humanReadable === "Strongly Negative") {
        return <StrongNegative />;
    }
}

export default App;
