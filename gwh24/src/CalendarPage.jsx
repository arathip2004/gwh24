import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Make sure to adjust the path
import { useCookies } from 'react-cookie'; // Import the cookie hook

function MyCalendar() {
    const [value, onChange] = useState(new Date());
    const [numOfPositives, setNumPositive] = useState(0);
    const [calendarData, setCalendarData] = useState({});
    const [cookies, setCookie] = useCookies(['userUUID']); // Add cookie handling
    const [sentimentImage, setSentimentImage] = useState('./src/stem.png'); // Default to neutral

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

                    // Update the calendar data
                    calendarDataTemp[date] = docData.sentiment;

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
            const sentiment = calendarData[dateString];
            const isActive = value.toISOString().split('T')[0] === dateString; // Currently selected date

            if (isActive) {
                return sentiment ? `active-day ${sentiment.toLowerCase().replace(' ', '-')}` : 'active-day';
            }

            if (sentiment === 'Strongly Positive') {
                return 'strong-positive-day';
            } else if (sentiment === 'Positive') {
                return 'positive-day';
            } else if (sentiment === 'Neutral') {
                return 'neutral-day';
            } else if (sentiment === 'Negative') {
                return 'negative-day';
            } else if (sentiment === 'Strongly Negative') {
                return 'strongly-negative-day';
            }
        }
        return '';
    };

    // Update the sentiment image based on the selected date's sentiment
    useEffect(() => {
        const selectedDateString = value.toISOString().split('T')[0];
        let sentiment = "";
        if (numOfPositives <=3) {
            sentiment = 'Strongly Negative';
        } else if (numOfPositives > 3 && numOfPositives <=8) {
            sentiment = 'Negative';
        } else if (numOfPositives >8 && numOfPositives <=12) {
            sentiment = 'Neutral';
        } else if (numOfPositives >12 && numOfPositives <=20) {
            sentiment = 'Positive';
        } else {
            sentiment = 'Strongly Positive';
        }

        if (sentiment) {
            setSentimentImage(sentimentImages[sentiment]);
        } else {
            setSentimentImage(sentimentImages['Neutral']); // Default to neutral if no data
        }
    }, [value, calendarData]);

    return (
        <>
            <div className="container">
                <div className="my-custom-calendar">
                    <h1>Select a Date</h1>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        tileClassName={getTileClassName}
                    />
                    <p>Selected date: {value.toDateString()}</p>
                </div>
                <div className="flower-image">
                    <img
                        src={sentimentImage}
                        alt="Sentiment"
                    />
                    <h1 className = "flower-text">Help your flower grow by having more good days!</h1>
                    <h4>You have {numOfPositives} good days so far.</h4>
                </div>
            </div>
        </>
    );
}

export default MyCalendar;
