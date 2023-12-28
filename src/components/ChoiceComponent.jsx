import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";

// Functional component for rendering a choice based on the choiceId
const ChoiceComponent = ({ choiceId }) => {
    // Destructuring values from the useDrupalData hook, fetching data for the specified choiceId
    const { data: choiceData, isLoading: isChoiceLoading, error: choiceError } = useDrupalData(`/jsonapi/poll_choice/poll_choice/${choiceId}`);

    // Rendering the choice data inside a div
    return(
        <div>
            {choiceData?.data?.attributes?.choice}
        </div>
    )

};

ChoiceComponent.propTypes = {
    choiceId: PropTypes.string.isRequired
}
export default ChoiceComponent;