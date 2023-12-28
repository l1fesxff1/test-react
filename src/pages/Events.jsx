// Import necessary components for the Events page.
import DynamicDataBlocks from "../components/DynamicDataBlocks.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import {useWindowSize} from "react-use";
import {useEffect, useState} from "react";
import useLanguagePrefix from "../services/languagePrefix.jsx";

// Define the Events functional component.
function Events() {
    const size = useWindowSize();
    const [imageStyle, setImageStyle] = useState('');
    const languagePrefix = useLanguagePrefix();

    useEffect(() => {
        if (size.width < 480) {
            setImageStyle('dynamicdata_480x200');
        } else {
            setImageStyle('dynamicdata_243x231');
        }
    }, [size.width]);
    // Render the Events component using DynamicDataBlocks for fetching and displaying event data.
    return (
        <>
            <DynamicDataBlocks
                // Specify the type of data as 'events'.
                type="events"
                // Define the endpoint for fetching events data based on date and category filters.
                endpoint={(date, category) =>
                    `jsonapi/views/events/block_1?views-filter[created]=${date}&views-filter[field_type_target_id]=${category}`
                }
                // Render each event using the specified JSX with item data and index.
                render={(item, index) => (
                    <div className={"view-row"}>
                        <div className={"events-block-card mb-[35px]"} key={index}>
                            <div className={"left-box"}>
                                {/*
                            Render the ImageComponent with the news item's image data.
                            Pass the URL, image style, and alt text as props.
                        */}
                                {item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id && (
                                    <ImageComponent url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                                    imagestyle={imageStyle}
                                                    alt={item?.relationships?.field_image?.data?.meta?.alt}
                                    />
                                )}
                            </div>
                            <div className={"right-box"}>
                                {/* Render a link to the news item's path with the news title. */}
                                <a className={"right-box-title"} href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>

                                {/* Render a div with the summary of the news item's description. */}
                                <div className={"right-box-description"}>{item?.attributes?.field_description?.summary}</div>
                                <div className={"right-box-button"}>
                                    <a href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            />
        </>
    );
}

// Export the Events component for use in other parts of the application.
export default Events;
