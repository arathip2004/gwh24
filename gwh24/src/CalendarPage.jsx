import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Ensure the correct path
import { useCookies } from 'react-cookie';
import key from "./key.svg"; // Ensure the path to the key image
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating userUUID

function MyCalendar() {
    const [value, onChange] = useState(new Date());
    const [numOfPositives, setNumPositive] = useState(0);
    const [calendarData, setCalendarData] = useState({});
    const [cookies, setCookie] = useCookies(['userUUID']); // Cookie handling
    const [sentimentImage, setSentimentImage] = useState('./src/stem.png'); // Default to neutral
    const [selectedMessage, setSelectedMessage] = useState('No message for this day.'); // State for selected message
    const [selectedSentiment, setSelectedSentiment] = useState('No sentiment'); // State for selected sentiment

    const sentimentImages = {
        'Strongly Positive': './src/flowerBlossom.png',
        'Positive': './src/bud.png',
        'Neutral': './src/stem.png',
        'Negative': './src/leaf.png',
        'Strongly Negative': './src/dirt.png',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userUUID = cookies.userUUID;
                if (!userUUID) {
                    // If no UUID is stored in cookies, generate a new one
                    userUUID = uuidv4();
                    setCookie('userUUID', userUUID, { path: '/' });
                }

                // Fetch sentiment data from Firestore
                const userCollectionRef = collection(db, 'users', userUUID, 'sentiments');
                const snapshot = await getDocs(userCollectionRef);

                let num = 0;
                let calendarDataTemp = {}; // Temp object to store data

                snapshot.forEach(doc => {
                    const docData = doc.data();
                    const date = docData.date.toDate().toISOString().split('T')[0]; // Format date

                    // Update the calendar data with sentiment and message
                    calendarDataTemp[date] = {
                        sentiment: docData.sentiment,
                        message: docData.message || 'No message for this day.'
                    };

                    // Count positive sentiments
                    if (docData.sentiment === 'Positive' || docData.sentiment === 'Strongly Positive') {
                        num++;
                    }
                });

                setCalendarData(calendarDataTemp); // Update state with new data
                setNumPositive(num); // Set positive count
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [cookies, setCookie]);

    const getTileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            const dataForDate = calendarData[dateString];
            const isActive = value.toISOString().split('T')[0] === dateString; // Currently selected date

            if (isActive) {
                return dataForDate ? `active-day ${dataForDate.sentiment.toLowerCase().replace(' ', '-')}` : 'active-day';
            }

            if (dataForDate?.sentiment === 'Strongly Positive') {
                return 'strong-positive-day';
            } else if (dataForDate?.sentiment === 'Positive') {
                return 'positive-day';
            } else if (dataForDate?.sentiment === 'Neutral') {
                return 'neutral-day';
            } else if (dataForDate?.sentiment === 'Negative') {
                return 'negative-day';
            } else if (dataForDate?.sentiment === 'Strongly Negative') {
                return 'strongly-negative-day';
            }
        }
        return '';
    };

    // Update the sentiment image based on the number of positive sentiments
    useEffect(() => {
        let sentiment = "";
        if (numOfPositives <= 3) {
            sentiment = 'Strongly Negative';
        } else if (numOfPositives > 3 && numOfPositives <= 8) {
            sentiment = 'Negative';
        } else if (numOfPositives > 8 && numOfPositives <= 12) {
            sentiment = 'Neutral';
        } else if (numOfPositives > 12 && numOfPositives <= 20) {
            sentiment = 'Positive';
        } else {
            sentiment = 'Strongly Positive';
        }

        setSentimentImage(sentimentImages[sentiment]); // Set sentiment image based on count
    }, [numOfPositives]); // Only depend on number of positives

    // Update selected message and sentiment when a date is selected
    useEffect(() => {
        const selectedDateString = value.toISOString().split('T')[0];
        const dataForSelectedDate = calendarData[selectedDateString];

        if (dataForSelectedDate) {
            setSelectedSentiment(dataForSelectedDate.sentiment);
            setSelectedMessage(dataForSelectedDate.message || 'No message for this day.');
        } else {
            setSelectedSentiment('No sentiment'); // Set default sentiment
            setSelectedMessage('No message for this day.'); // Set default message
        }
    }, [value, calendarData]);

    return (
        <>
            <div className="container">
                <div className='calendarAndKey'>
                    <div className="my-custom-calendar">
                        <h1>Select a Date</h1>
                        <Calendar
                            onChange={onChange}
                            value={value}
                            tileClassName={getTileClassName}
                        />
                        <p>Selected date: {value.toDateString()}</p>
                        <p>Message You Entered: {selectedMessage}</p>
                        <p>Sentiment: {selectedSentiment}</p>
                    </div>
                    <div className='picAndTitle'>
                        <p>Key:</p>
                        <img src={key} alt="Key" className="keypicture" />
                    </div>
                </div>
                <div className="flower-image">
                    <img
                        src={sentimentImage}
                        alt="Sentiment"
                    />
                    <h1 className="flower-text">Help your flower grow by having more good days!</h1>
                    <h4>You have {numOfPositives} good days so far.</h4>
                </div>
            </div>
        </>
    );
}

export default MyCalendar;
