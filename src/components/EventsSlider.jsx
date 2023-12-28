import { format} from "date-fns";
import {uk} from "date-fns/locale"
import ImageComponent from "./ImageComponent.jsx";
import Slider from "react-slick";
import PropTypes from "prop-types";
import arrow from '/src/assets/long-arrow-right.png'
import useLanguagePrefix from "../services/languagePrefix.jsx";


// Function to truncate text to a specified maximum length
function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}


// Functional component for rendering an events slider
function EventsSlider({data}) {
    // Settings configuration for the Slider component
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
        ]
    };
    const langPrefix = useLanguagePrefix();
    if (data?.data && data.data.length > 3) {
        settings.slidesToShow = 3;
    } else if (data?.data) {
        settings.slidesToShow = data.data.length;
    }

    return (
        <div className="events-slider__container">
            {/* Using the Slider component with specified settings */}
            <Slider {...settings}>
                {/* Mapping through the array of events */}
            {data?.data?.map((event) => (
                <div key={event.id} className="events-slider__item">
                    <div className="events-slider__top">
                        <div className="events-slider__block-date">
                            {/* Displaying the start and end dates of the event in a specific format */}
                            {langPrefix === 'uk' && <><div>{format(new Date(event?.attributes?.field_duration?.value), 'dd MMMM HH:mm', { locale: uk})}</div>
                                <div>{format(new Date(event?.attributes?.field_duration?.end_value), 'dd MMMM HH:mm', {locale: uk})}</div></>}
                            {langPrefix === 'en' && <><div>{format(new Date(event?.attributes?.field_duration?.value), 'dd MMMM HH:mm')}</div>
                                <div>{format(new Date(event?.attributes?.field_duration?.end_value), 'dd MMMM HH:mm')}</div></>}
                        </div>
                        {/* Rendering the ImageComponent with the specified URL and style */}
                        <ImageComponent url={event?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                        imagestyle='news_275x185'/>
                        {/* Displaying the title of the event */}
                        <div className="events-slider__title"><h3>{event?.attributes?.title}</h3></div>
                    </div>
                    <div className="events-slider__bottom">
                        <div className="events-slider__title"><h3>{event?.attributes?.title}</h3></div>

                    {/* Displaying the truncated description of the event */}
                    <div
                        dangerouslySetInnerHTML={{__html: truncateText(event?.attributes?.field_description?.summary, 150)}} className="events-slider__summary"/>
                    {/* Link to the event with an arrow icon */}
                    <div className="events-slide__link-block"><a href={`/${langPrefix}${event?.attributes?.path?.alias}`}><img src={arrow} alt='link'/></a></div>
                    </div>
                </div>
            ))}
            </Slider>
        </div>
    )
}

EventsSlider.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default EventsSlider