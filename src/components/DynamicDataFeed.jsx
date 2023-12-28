// Import the useDrupalData hook to fetch data from Drupal API.
import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";
import useLanguagePrefix from "../services/languagePrefix.jsx";

// Define the DynamicDataFeed component that takes 'id' and 'type' as props.
function DynamicDataFeed({id, type}) {
    // Fetch data using useDrupalData hook with the specified endpoint and arguments.
    const {data: feedData} = useDrupalData(`/jsonapi/views/news_in_block/${type}?views-argument[0]=${id}`)
    const langPrefix = useLanguagePrefix();
    // Render the DynamicDataFeed component with conditional rendering based on feedData presence.
    return (
        <>
            {feedData?.data?.length > 0 && (
                <div className={"feed-data"}>
                    <h1 className={"feed-data-title"}>Other {type}</h1>
                    <div className={"feed-data-container"}>
                        {/*
                    Map over feedData's data items and render a div for each item.
                    Each div contains a link to the item's path and the item's title.
                    */}
                        {feedData?.data?.map((item) => (
                            <div className={"feed-data-item items-center flex gap-2.5"}
                                 key={item?.attributes?.drupal_internal__nid}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                                </svg>
                                <a href={`/${langPrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

// PropTypes block to define the expected types for props
DynamicDataFeed.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
};

// Export the DynamicDataFeed component for use in other parts of the application.
export default DynamicDataFeed