import ImageComponent from "./ImageComponent.jsx";
import Slider from "react-slick";
import PropTypes from "prop-types";
import FieldLink from "./FieldLink.jsx";
import DOMPurify from 'dompurify';
import ReadMore from "./ReadMore.jsx";

// Functional component for rendering a main slider
function MainSlider({data}) {
    // Configuration settings for the Slider component
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        useTransform: false
    };

    return (
        // Using the Slider component with specified settings
        <Slider {...settings} className="main-slider">
            {/* Mapping through the array of slides */}
            {data?.data?.map((slide) => (
                <div key={slide?.attributes?.info} className="main-slider__item">
                    {/* Rendering the ImageComponent with the specified URL and style */}
                    <ImageComponent url={slide?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    className="main-slider__image"/>
                    <div className="main-slider__overlay"/>
                    <div className="main-slider__item-content">
                        {/* Displaying the information/title of the slide */}
                        <h3 className="main-slider__title">{slide?.attributes?.info}</h3>
                        <div className="main-slider__line" />
                        {/* Rendering the FieldLink component if a related link exists */}
                        <div
                            className="main-slider__description">{slide?.attributes?.field_description?.value.replace(/(<([^>]+)>)/gi, '')}</div>
                        {slide?.relationships?.field_link?.links?.related?.href &&
                            <FieldLink url={new URL(slide?.relationships?.field_link?.links?.related?.href).pathname}
                                       className="main-slider__link"/>}
                    </div>n
                </div>
            ))}
        </Slider>
    );
}

MainSlider.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default MainSlider