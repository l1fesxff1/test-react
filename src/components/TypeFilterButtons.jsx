// Import the useDrupalData hook to fetch data from the Drupal API.
import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";
import useLanguagePrefix from "../services/languagePrefix.jsx";

// Define the TypeFilterButtons component that takes 'handleTypeInformation' as a prop.
function TypeFilterButtons({handleTypeInformation}) {
    // Fetch data using useDrupalData hook with the endpoint for taxonomy term type information.
    const {data: typeData} = useDrupalData('jsonapi/taxonomy_term/type_information');
    const langPrefix = useLanguagePrefix();

    // Render the TypeFilterButtons component with Clear button and taxonomy term buttons.
    return (
        <div className={"type-filter"}>
            <select
                className={"type-filter__select"}
                onChange={(e) => handleTypeInformation(e.target.value)}
            >
                <option value={"All"}>{(langPrefix === 'en' && "Category") || ("Категорії")}</option>
                {typeData?.data?.map((item, index) => (
                    <option key={index} value={item.attributes.drupal_internal__tid}>
                        {item.attributes.name}
                    </option>
                ))}
            </select>
        </div>

    );
}

// PropTypes block to define the expected types for props
TypeFilterButtons.propTypes = {
    handleTypeInformation: PropTypes.func.isRequired,
};

// Export the TypeFilterButtons component for use in other parts of the application.
export default TypeFilterButtons;
