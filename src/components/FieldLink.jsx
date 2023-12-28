import useDrupalData from "../services/api.jsx";
import NodeLink from "./NodeLink.jsx";
import PropTypes from "prop-types";

// Functional component for rendering a link based on a Drupal field
function FieldLink({ url, className }) {
    // Destructuring values from the useDrupalData hook, fetching data for the specified URL
    const {
        data: fieldLinkData,
        isLoading: isFieldsssLinkLoading,
        error: fieldsLisnkError
    } = useDrupalData(url);

// Rendering the NodeLink component if the fieldLinkData contains a valid self link
    return (
        <>
            {fieldLinkData?.data?.links?.self?.href && <NodeLink className={className} url={new URL(fieldLinkData?.data?.links?.self?.href).pathname}/>}
        </>
    );
}

FieldLink.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default FieldLink;