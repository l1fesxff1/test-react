// Import necessary dependencies and components for the DynamicDataBlocks component.
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import CalendarFilter from "../components/CalendarFilter.jsx";
import TypeFilterButtons from "../components/TypeFilterButtons.jsx";
import queryString from 'query-string';
import Pager from "./Pager.jsx";
import PropTypes from "prop-types";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import Metatags from "./Metatags.jsx";
import ImageComponent from "./ImageComponent.jsx";
import {format} from "date-fns";
import {uk} from "date-fns/locale";

// Define the DynamicDataBlocks component that takes type, endpoint, and render as props.
function DynamicDataBlocks({type, endpoint, render}) {
    // Access the navigation function from react-router-dom.
    const navigate = useNavigate();

    // Parse the query parameters from the URL.
    const search = window.location.search;
    const parsed = queryString.parse(search);

    // Extract date and category parameters or set defaults.
    const date = parsed.date;
    const category = parsed.category || 'All';

    // State variables for type information, selected date, and current page.
    const [typeInformation, setTypeInformation] = useState('All');
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    // Function to handle page changes.
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to format a date into a long format (YYYY-MM-DD).
    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to handle changes in type information.
    const handleTypeInformation = (type) => {
        setTypeInformation(type);
        navigate({
            // Update URL search parameters based on type and selected date.
            search: `?category=${type}${selectedDate ? `&date=${formatLongDate(null, selectedDate)}` : ''}`,
        });
    };

    // Function to handle changes in selected date.
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date ? formatLongDate(null, date) : null;
        navigate({
            // Update URL search parameters based on type information and formatted date.
            search: `?${typeInformation ? `category=${typeInformation}&` : ''}date=${formattedDate}`,
        });
    };

    const handleClear = () => {
        setTypeInformation(null);
        setSelectedDate(null);

        navigate({
            // Clear URL search parameters.
            search: '',
        });
    };

    // Fetch data using useDrupalData hook with the specified endpoint, date, category, and current page.
    const {data} = useDrupalData(endpoint(date, category, currentPage));

    // Calculate total count, items per page, and total pages.
    const totalCount = data?.meta?.pager?.count || 0;
    const itemsPerPage = data?.meta?.pager?.configurations?.items_per_page || 1;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const langPrefix = useLanguagePrefix();

    const location = useLocation();
    const currentPath = location.pathname;
    const {data: mainNews} = useDrupalData(`jsonapi/views/news/block_2`)
    // Render the DynamicDataBlocks component with TypeFilterButtons, CalendarFilter, data items, and Pager.
    return (
        <>
            <Metatags type={"view"} data={data} viewUrl={currentPath}/>
            <div className={"container"}>
                {type === 'news' && mainNews?.data?.length > 3 && (
                    <div className={"main-news flex justify-between"}>
                        <div className={"main-news__left"}>
                            <div className={"main-news__first main-news__item"}>
                                <div className={"cover-text"}>
                                    {langPrefix === 'uk' && <div
                                        className={"date_field"}>{format(new Date(mainNews?.data?.[0]?.attributes?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                    {langPrefix === 'en' && <div
                                        className={"date_field"}>{format(new Date(mainNews?.data?.[0]?.attributes?.created), 'dd MMMM HH:mm')}</div>}
                                    <div className={"teaser_title"}>{mainNews?.data?.[0]?.attributes?.title}</div>
                                </div>
                                <ImageComponent alt={mainNews?.data?.[0]?.relationships?.field_image?.data?.meta?.alt}
                                                url={mainNews?.data?.[0]?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                                imagestyle={"main_news_first_item"}/>
                            </div>
                        </div>
                        <div className={"main-news__right flex flex-col justify-between"}>
                            <div className={"top flex justify-between"}>
                                <div className={"main-news__second main-news__item"}>
                                    <div className={"cover-text"}>
                                        {langPrefix === 'uk' && <div
                                            className={"date_field"}>{format(new Date(mainNews?.data?.[1]?.attributes?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                        {langPrefix === 'en' && <div
                                            className={"date_field"}>{format(new Date(mainNews?.data?.[1]?.attributes?.created), 'dd MMMM HH:mm')}</div>}
                                        <div className={"teaser_title"}>{mainNews?.data?.[1]?.attributes?.title}</div>
                                    </div>
                                    <ImageComponent
                                        alt={mainNews?.data?.[1]?.relationships?.field_image?.data?.meta?.alt}
                                        url={mainNews?.data?.[1]?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                        imagestyle={"main_news_second_third_items"}/>
                                </div>
                                <div className={"main-news__third main-news__item"}>
                                    <div className={"cover-text"}>
                                        {langPrefix === 'uk' && <div
                                            className={"date_field"}>{format(new Date(mainNews?.data?.[2]?.attributes?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                        {langPrefix === 'en' && <div
                                            className={"date_field"}>{format(new Date(mainNews?.data?.[2]?.attributes?.created), 'dd MMMM HH:mm')}</div>}
                                        <div className={"teaser_title"}>{mainNews?.data?.[2]?.attributes?.title}</div>
                                    </div>
                                    <ImageComponent
                                        alt={mainNews?.data?.[2]?.relationships?.field_image?.data?.meta?.alt}
                                        url={mainNews?.data?.[2]?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                        imagestyle={"main_news_second_third_items"}/>
                                </div>
                            </div>
                            <div className={"bottom"}>
                                <div className={"main-news__fourth main-news__item"}>
                                    <div className={"cover-text"}>
                                        {langPrefix === 'uk' && <div
                                            className={"date_field"}>{format(new Date(mainNews?.data?.[3]?.attributes?.created), 'dd MMMM HH:mm', {locale: uk})}</div>}
                                        {langPrefix === 'en' && <div
                                            className={"date_field"}>{format(new Date(mainNews?.data?.[3]?.attributes?.created), 'dd MMMM HH:mm')}</div>}
                                        <div className={"teaser_title"}>{mainNews?.data?.[3]?.attributes?.title}</div>
                                    </div>
                                    <ImageComponent
                                        alt={mainNews?.data?.[3]?.relationships?.field_image?.data?.meta?.alt}
                                        url={mainNews?.data?.[3]?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                        imagestyle={"main_news_fourth_item"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className={"menu-dynamic-data-blocks flex justify-between"}>
                    {type === 'news' ?
                        <h1 className={"subtitle"}>{(langPrefix === "en" && "All news") || ("Усі новини")}</h1> :
                        <h1 className={"subtitle"}>{(langPrefix === "en" && "All events") || ("Усі події")}</h1>}

                    <div className={"menu-dynamic-data-blocks__left"}>
                        {/* Render TypeFilterButtons with a callback function for type information changes. */}
                        <TypeFilterButtons handleTypeInformation={handleTypeInformation}/>
                        {/* Render CalendarFilter with selectedDate and a callback function for date changes. */}
                        <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange}/>
                        {/* Render a Clear button with an onClick event to reset the selected date to null. */}
                        <button className={"button-clear"} onClick={() => handleClear()}>
                            <span>{(langPrefix === 'en' && "Clear") || ("Очистити")}</span>
                        </button>
                    </div>
                </div>
                <div className={"wrapper-dynamic-data-blocks"}>
                    <div className={"dynamic-data-blocks view-content"}>
                        {/*
                        Map over the data items using the render function.
                        For each item in the data array, call the render function with the item and index.
                    */}
                        {data?.data?.length ? (
                            data?.data?.map((item, index) => render(item, index))
                        ) : (
                            <div className={"empty-dynamic-container"}><h1>No {type} found with the selected
                                filters.</h1></div>
                        )}
                    </div>
                </div>
                {totalPages > 1 && (
                    <div className={"pager flex justify-center mt-[20px]"}>
                        <Pager totalPages={totalPages} onPageChange={handlePageChange}/>
                    </div>
                )}
            </div>
        </>
    );
}

// PropTypes block to define the expected types for props
DynamicDataBlocks.propTypes = {
    type: PropTypes.string.isRequired,
    endpoint: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
};

// Export the DynamicDataBlocks component for use in other parts of the application.
export default DynamicDataBlocks;
