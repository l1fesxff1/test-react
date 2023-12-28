import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";
import StaffTitlePosition from "./StaffTitlePosition.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import PropTypes from "prop-types";

function Departments({id_deparments}){
    const languagePrefix = useLanguagePrefix();
    const {data: department} = useDrupalData(`jsonapi/views/departments/block_1?views-argument[0]=${id_deparments}`)
    return (
        <div>
            {department?.data?.map((item, index) =>(
                <div key={index}>
                    <div>
                        <a href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item?.attributes?.title}</a>
                    </div>
                    {item?.relationships?.field_image &&(
                        <div>
                            <ImageComponent
                                imagestyle={"large"}
                                alt={item?.relationships?.field_image?.data?.meta?.alt}
                                url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id} />
                        </div>
                    )}
                    {item?.relationships?.field_head_of_department &&(
                        <StaffTitlePosition staff_id={item?.relationships?.field_head_of_department?.data?.meta?.drupal_internal__target_id} />
                    )}
                    {item?.attributes?.field_mail?.map((mail, index) => (
                        <div key={index}>
                            <a href={`mailto:${mail}`}>{mail}</a>
                        </div>
                    ))}
                    {item?.attributes?.field_phone?.map((phone, index) => (
                        <div key={index}>
                            <a href={`tel:${phone}`}>{phone}</a>
                        </div>
                    ))}
                    <div>
                        {item?.attributes?.field_location}
                    </div>
                    <div>
                        {item?.attributes?.field_wiki?.full_url}
                    </div>
                </div>
            ))}
        </div>
    );
}
Departments.propTypes = {
    id_deparments: PropTypes.number.isRequired,
};
export default Departments