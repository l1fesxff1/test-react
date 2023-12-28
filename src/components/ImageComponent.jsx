// Import the useDrupalData hook to fetch data from the Drupal API.
import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";

// Access the base URL for the backend from environment variables.
const baseURL = import.meta.env.VITE_BACKEND_URL;

// Define the ImageComponent that takes 'url', 'imagestyle', and 'alt' as props.
const ImageComponent = ({ url, imagestyle, alt }) => {
    // Fetch data using useDrupalData hook with the specified file endpoint.
    const { data: fileData} = useDrupalData(`entity/file/${url}`);

    // Determine the image source based on the presence of 'imagestyle'.
    const imageSource = imagestyle
        ? fileData?.image_style_uri?.[0]?.[imagestyle]
        : `${baseURL}${fileData?.uri?.[0]?.url}`;

    // Render the ImageComponent with a conditional rendering based on the presence of 'imagestyle'.
    return (
        <>
            {/*
                If 'imagestyle' is provided, render an <img> tag with the specified image style URI.
                Otherwise, render an <img> tag with the base URL and file URI.
            */}
            {url && imageSource && (
                <img src={imageSource} alt={alt} />
            )}
        </>
    );

};

// PropTypes block to define the expected types for props
ImageComponent.propTypes = {
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imagestyle: PropTypes.string,
    alt: PropTypes.string.isRequired,
};

// Export the ImageComponent for use in other parts of the application.
export default ImageComponent;