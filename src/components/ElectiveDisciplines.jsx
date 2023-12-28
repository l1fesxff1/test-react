import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function ElectiveDisciplines({endpoint}) {
    const {data: electiveData} = useDrupalData(endpoint);
    return <>
        <table>
            <tbody>
            {electiveData?.rows?.map((item, index) => (
                <tr key={index}>
                    <td><a href={baseURL + item?.field_doc_elective_discipline} target={"_blank"}
                           rel={"noopener noreferrer"}>{item?.field_title}</a></td>
                    <td>{item?.field_course_of_study}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </>


}

ElectiveDisciplines.propTypes = {
    endpoint: PropTypes.string.isRequired
};

export default ElectiveDisciplines