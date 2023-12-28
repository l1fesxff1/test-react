// Import necessary components for the NewsFullMode page.
import DynamicDataFullMode from "../components/DynamicDataFullMode.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import React from "react";
import ShareButtonComponent from "../components/ShareButtonComponent.jsx";
import CounterComponent from "../components/CounterComponent.jsx";

// Define the NewsFullMode functional component.
function NewsFullMode() {
    // Render the NewsFullMode component using DynamicDataFullMode for fetching and displaying detailed news data.
    return (
        <>
            <DynamicDataFullMode
                // Specify the type of data as 'news'.
                types="news"
                // Define the endpoint for fetching detailed news data based on the alias.
                endpoint={(alias) => `news/${alias}?_format=json`}
                // Render each field of the news using the specified JSX with data.
                renderFields={(data) => (
                    <div className={"dynamic-data-full-mode-fields"}>
                        {/* Map over field_image data and render ImageComponent for each item. */}
                        {data.field_image?.map((item, index) => (
                            <div key={index}>
                                {item?.target_id && (
                                    <ImageComponent url={item?.target_id} imagestyle="width_862" alt={item?.alt}/>
                                )}
                            </div>
                        ))}
                        {/* Map over field_description data and render HTML content for each item. */}
                        {data.field_description?.map((item, index) => (
                            <div key={index}>
                                <div className={"field-description"} dangerouslySetInnerHTML={{ __html: `${item.value}` }}></div>
                            </div>
                        ))}
                        <ShareButtonComponent data={data} />
                        <CounterComponent />
                    </div>

                )}
            />
        </>
    );
}

// Export the NewsFullMode component for use in other parts of the application.
export default NewsFullMode;