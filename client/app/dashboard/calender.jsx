'use client'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from "react";
import { getTokenFromCookie } from "../components/getUserData";
import axios from "axios";
import './dashboard.css'

const CalendarComponent = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCalendarData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/codeTracker/getCodeTrackerCalendar', {
                headers: {
                    'authorization': `Bearer ${getTokenFromCookie}`, // Call getTokenFromCookie as a function
                },
            });

            // Convert API dates to JavaScript Date objects
            const apiDates = response.data.body.map(dateStr => new Date(dateStr));
            const todayDate = new Date();
            setCalendarData([...apiDates, todayDate]);
            setLoading(false);
        } catch (err) {
            console.log("Something went wrong while fetching data for calendar:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCalendarData();
    }, []);

    // Helper function to check if a date should be marked
    const isMarkedDate = (date) => {
        return calendarData.some(markedDate => {
            return date.getFullYear() === markedDate.getFullYear() &&
                   date.getMonth() === markedDate.getMonth() &&
                   date.getDate() === markedDate.getDate();
        });
    };

    // Define how to apply classes to marked dates
    const tileClassName = ({ date, view }) => {
        if (view === 'month' && isMarkedDate(date)) {
            return 'highlight-date'; // Add a class to marked dates
        }
        return null;
    };

    return (
        <div className='w-full'>
            {loading ? (
                <div>Loading ...</div>
            ) : (
                <div>
                    <Calendar
                        className='rounded-xl min-w-full mt-4'
                        tileClassName={tileClassName}
                    />
                    {/* {console.log(calendarData)} */}
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;
