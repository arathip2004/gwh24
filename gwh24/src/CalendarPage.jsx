
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

function MyCalendar() {
    const [value, onChange] = useState(new Date());
    const sentimentData = {
        '2024-10-01': 'Negative',
        '2024-10-02': 'Positive',
        '2024-10-03': 'Positive',
        '2024-10-04': 'Strongly Negative',
        '2024-10-05': 'Strongly Negative',
        '2024-10-06': 'Negative',
        '2024-10-07': 'Neutral',
        '2024-10-10': 'Neutral',
        '2024-10-11': 'Strongly Positive',
        '2024-10-12': 'Positive',
        '2024-10-13': 'Positive',
        '2024-10-15': 'Strongly Negative',
        '2024-10-16': 'Strongly Positive',
        '2024-10-17': 'Positive',
        '2024-10-18': 'Negative',
        '2024-10-19': 'Neutral',
    };
    const getTileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            const sentiment = sentimentData[dateString];
            if(sentiment === "Strongly Positive") {
                return 'strong-positive-day';
            } else if(sentiment === "Positive") {
                return 'positive-day'
            } else if(sentiment === "Neutral") {
                return 'neutral-day'
            } else if(sentiment === "Negative") {
                return 'negative-day'
            } else if(sentiment === "Strongly Negative") {
                return 'strongly-negative-day'
            }
        }
        return '';
    };
    return (
        <div className="my-custom-calendar">
            <h1>Select a Date</h1>
            <Calendar
                onChange={onChange}
                value={value}
                tileClassName={getTileClassName}
            />
            <p>Selected date: {value.toDateString()}</p>
        </div>
    );
}

export default MyCalendar;