// Import necessary components for the EventsFullMode page.
import DynamicDataFullMode from "../components/DynamicDataFullMode.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import moment from 'moment';

// Define the EventsFullMode functional component.
function EventsFullMode() {
    // Render the EventsFullMode component using DynamicDataFullMode for fetching and displaying detailed event data.
    return (
        <DynamicDataFullMode
            // Specify the type of data as 'events'.
            types="events"
            // Define the endpoint for fetching detailed events data based on the alias.
            endpoint={(alias) => `events/${alias}?_format=json`}
            // Render each field of the event using the specified JSX with data.
            renderFields={(data) => (
                <div className={"dynamic-data-full-mode-fields"}>
                    {/* Map over field_image data and render ImageComponent for each item. */}
                    {data.title?.map((item, index) => (
                        <div key={index}>
                            <h1 className={"block-title events-block-title"}>{item.value}</h1>
                        </div>
                    ))}
                    {/* Map over field_image data and render ImageComponent for each item. */}
                    {data.field_image?.map((item, index) => (
                        <div className={"flex "} key={index}>
                            <ImageComponent url={item.target_id} imagestyle="width_862" alt={item?.alt}/>
                        </div>
                    ))}
                    {/* Map over field_description data and render HTML content for each item. */}
                    {data.field_description?.map((item, index) => (
                        <div key={index}>
                            <div className={"text-sm pb-[30px] field-description"} dangerouslySetInnerHTML={{ __html: `${item.value}` }}></div>
                        </div>
                    ))}
                    {/* Map over field_duration data and render start and end values for each item. */}
                    {data.field_duration?.map((item, index) => (
                        <div key={index}>
                            <p className={"pt-[30px]"}>Start date: {moment(item.value).format('dddd, D MMMM YYYY - HH:mm')}</p>
                            <p className={"pt-5"}>End date: {moment(item.end_value).format('dddd, D MMMM YYYY - HH:mm')}</p>
                        </div>
                    ))}
                    {/* Map over field_location data and render a link to Google Maps for each item. */}
                    {data.field_location?.map((item, index) => (
                        <div className={"pt-5"} key={index}>
                            <div>Location: <a href={`https://www.google.com.ua/maps/search/${item.value}`}>{item.value}</a></div>
                        </div>
                    ))}
                </div>
            )}
        />
    );
}

// Export the EventsFullMode component for use in other parts of the application.
export default EventsFullMode;