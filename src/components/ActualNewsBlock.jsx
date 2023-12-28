import ImageComponent from "./ImageComponent.jsx";
import PropTypes from "prop-types";
import useLanguagePrefix from "../services/languagePrefix.jsx";

// Functional component for rendering a block of actual news
function ActualNewsBlock({data}) {
    const languagePrefix = useLanguagePrefix();
    return (
        <div className="actual-news-block__container">
            {/* Mapping through the array of news articles */}
            {data?.data?.map((article) => (
                // Each news article is wrapped in a div with a unique key

                <a href={`/${languagePrefix}${article?.attributes?.path?.alias}`} key={article.id} className="actual-news-block__item">

                    {/* Rendering the ImageComponent with the specified URL and style */}
                    <ImageComponent url={article?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    imagestyle='actual_news'/>
                    <div className="actual-news-block__content">
                    {/* Displaying the title of the news article */}
                    <div className="actual-news-block__title"><h3>{article?.attributes?.title}</h3></div>
                    {/* Displaying the summary or description of the news article */}
                    <div className="actual-news-block__summary"><span>{article?.attributes?.field_description?.summary}</span></div>
                    </div>

                </a>

            ))}
        </div>
    )
}

// Prop type validation for the 'data' prop
ActualNewsBlock.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default ActualNewsBlock