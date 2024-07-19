'use client'
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

const test = () => {
  return (
    <div>
      <Calendar activeStartDate={new Date} />
    </div>
  )
}

export default test