// Import necessary dependencies for the CalendarFilter component.
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import PropTypes from "prop-types";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import {useState} from "react";

// Define the CalendarFilter component that takes selectedDate and onDateChange as props.
function CalendarFilter({ selectedDate, onDateChange }) {

    // Define a state to track whether the calendar is open or closed.
    const [calendarOpen, setCalendarOpen] = useState(false);

    // Define a function to toggle the calendar visibility.
    const toggleCalendar = () => {
        setCalendarOpen(!calendarOpen);
    };

    // Define a function handleDateClick to handle the click event on a calendar day.
    const handleDateClick = (value) => {
        // Call the onDateChange prop with the selected date value when a day is clicked.
        onDateChange(value);
    };

    const langPrefix = useLanguagePrefix();

    // Render the CalendarFilter component with a Calendar component and a Clear button.
    return (
        <>
                <button className="type-filter__select show-calendar" onClick={toggleCalendar}>
                    {calendarOpen ? `${langPrefix === 'en' ? 'Hide Calendar' : 'Приховати Календар'}` : `${langPrefix === 'en' ? 'Show Calendar' : 'Показати Календар'}`}
                </button>
                {/* Render the Calendar component with onClickDay to handle day clicks and value for the selected date. */}
                {calendarOpen && (
                    <Calendar className={"calendar"}
                        onClickDay={handleDateClick}
                        value={selectedDate}
                        locale={langPrefix}
                    />
                )}
        </>
    );
}

// PropTypes block to define the expected types for props
CalendarFilter.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func.isRequired,
};

// Export the CalendarFilter component for use in other parts of the application.
export default CalendarFilter;
