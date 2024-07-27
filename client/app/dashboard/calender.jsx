'use client'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from "react";
import './dashboard.css'
import { fetchCalendarData } from "@/apis/dashboardApis";
import Loading from "@/app/components/loading"

const CalendarComponent = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCalendarData().
        then((data)=>{
            const todayDate = new Date();
            setCalendarData([...data, todayDate]);
            setLoading(false);
        }).catch((error)=>{
            alert(err)
        })
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
                <Loading message="Loading calendar ..."/>
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
