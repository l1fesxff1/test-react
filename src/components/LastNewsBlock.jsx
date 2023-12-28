import ImageComponent from "./ImageComponent.jsx";
import PropTypes from "prop-types";
import tick from "/src/assets/home-tick.png"
import Slider from "react-slick";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import ReadMore from "./ReadMore.jsx";
// Functional component for rendering a block of last news
function LastNewsBlock({data}) {
    var settings = {

        dots: true,
        speed: 500,
        slidesToShow: 4,
        arrows: false,
        infinite: false,
        slidesToScroll: 0,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 975,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                }
            }
        ]
    };
    const langPrefix = useLanguagePrefix();

    return (
        <div className="last-news-block__container container">
            <Slider {...settings}>
            {/* Mapping through the array of news items */}
            {data?.data?.map((news) => (
                // Each news item is wrapped in a div with a unique key
                <div key={news.id} className="last-news-block__item">
                    {/* Link to the news item with the specified alias */}

                        {/* Rendering the ImageComponent with the specified URL and style */}
                    <ImageComponent url={news?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    imagestyle='news_275x185' alt={"test"}/>
                        {/* Displaying the title of the news item */}
                    <div className="last-news-block__title"><h3>{news?.attributes?.title}</h3></div>
                        {/* Displaying the summary or description of the news item */}
                    <div className="last-news-block__summary"><span>{news?.attributes?.field_description?.summary}</span></div>
                    <a href={`/${langPrefix}${news?.attributes?.path?.alias}`} className="last-news-block__link-block"><img src={tick}/><div  className="last-news-block__link"><ReadMore />
                    </div></a>
                </div>
            ))}
            </Slider>
        </div>
    )
}

LastNewsBlock.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default LastNewsBlock
