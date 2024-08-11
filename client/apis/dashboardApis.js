import { getTokenFromCookie } from "@/app/components/getUserData";
import axios from "axios";

module.exports.fetchCalendarData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/codeTracker/getCodeTrackerCalendar', {
            headers: {
                'authorization': `Bearer ${getTokenFromCookie}`, // Call getTokenFromCookie as a function
            },
        });

        // Convert API dates to JavaScript Date objects
        const apiDates = response.data.body.map(dateStr => new Date(dateStr));
        return apiDates
    } catch (err) {
        throw new Error("Something went wrong while fetching data for calendar:", err);
    }
};