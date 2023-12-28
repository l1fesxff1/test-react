// Import necessary dependencies and components for the FullModeComponent.
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import TypeFilterButtons from "../components/TypeFilterButtons.jsx";
import CalendarFilter from "../components/CalendarFilter.jsx";
import DynamicDataFeed from "./DynamicDataFeed.jsx";
import PropTypes from "prop-types";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import useLanguagePrefix from "../services/languagePrefix.jsx";
import Metatags from "./Metatags.jsx";

// Define the FullModeComponent that takes 'types', 'endpoint', and 'renderFields' as props.
function FullModeComponent({ types, endpoint, renderFields }) {
    // Access the navigation function from react-router-dom.
    const navigate = useNavigate();

    // Extract 'alias' from URL parameters using the useParams hook.
    const { alias } = useParams();
    const langPrefix = useLanguagePrefix();

    // State variables for type information and selected date.
    const [typeInformation, setTypeInformation] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    // Function to handle changes in type information.
    const handleTypeInformation = (type) => {
        setTypeInformation(type);
        navigate(`/${langPrefix}/${types}?category=${type}`);
    };

    // Function to handle changes in selected date.
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? formatLongDate(null, date) : null;
        navigate(`/${langPrefix}/${types}?date=${formattedDate}`);
    };

    // Function to format a date into a long format (YYYY-MM-DD).
    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Fetch data using useDrupalData hook with the specified endpoint and JSON format.
    const { data } = useDrupalData(`${types}/${alias}?_format=json`);


    const id = data?.nid?.[0]?.value;

    // Render the FullModeComponent with TypeFilterButtons, CalendarFilter, renderFields, and DynamicDataFeed.
    return (
        <>
            {data &&(
                <Metatags type={"content"} data={data}  />
            )}
            <div className={"container"}>
                <div className={"flex dynamic-data-full-mode gap-[30px]"}>
                    <div className={"dynamic-data-full-mode__left py-8"}>
                        {/* Render fields based on the renderFields function with data as an argument. */}
                        {renderFields(data)}

                        {/* Conditionally render DynamicDataFeed only if 'id' is not undefined. */}
                        {id && (
                            <DynamicDataFeed id={id} type={types} />
                        )}
                    </div>
                    <div className={"dynamic-data-full-mode__right pt-8 lg:block hidden"}>
                        {/* Render CalendarFilter with selectedDate and a callback function for date changes. */}
                        <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange} />

                        {/* Render TypeFilterButtons with a callback function for type information changes. */}
                        <TypeFilterButtons handleTypeInformation={handleTypeInformation} />
                    </div>
                </div>
            </div>
        </>
    );
}

// PropTypes block to define the expected types for props
FullModeComponent.propTypes = {
    types: PropTypes.string.isRequired,
    endpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    renderFields: PropTypes.func.isRequired,
};

// Export the FullModeComponent for use in other parts of the application.
export default FullModeComponent;
