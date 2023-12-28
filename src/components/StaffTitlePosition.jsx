import useDrupalData from "../services/api.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import PropTypes from "prop-types";

function StaffTitlePosition({ staff_id }){
    const languagePrefix = useLanguagePrefix();
    const {data: position} = useDrupalData(`node/${staff_id}?_format=json`)
    return(
        <>
            <div>
                <a href={`/${languagePrefix}${position?.path?.[0]?.alias}`}>{position?.title?.[0]?.value}</a>
            </div>
            <div>
                {position?.field_position_and_rank?.[0]?.value}
            </div>
        </>
    );
}
StaffTitlePosition.propTypes = {
    staff_id: PropTypes.number.isRequired,
};
export default StaffTitlePosition