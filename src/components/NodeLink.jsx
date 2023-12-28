import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import ReadMore from "./ReadMore.jsx";

// Functional component for rendering a link to a Drupal node based on its URL
function NodeLink({url, className}){
    // Destructuring values from the useDrupalData hook, fetching data for the specified URL
    const {
        data: nodeData,
        isLoading: isNodeLoading,
        error: nodeError
    } = useDrupalData(url);
    const langPrefix = useLanguagePrefix();

    // Rendering a link with the specified URL and link text
    return (
        <a className={className} href={`/${langPrefix}${nodeData?.data?.attributes?.path?.alias}`}><ReadMore /></a>
    )
}

NodeLink.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default NodeLink