import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import ContactInformation from "../components/ContactInformation.jsx";
import PropTypes from "prop-types";
import Metatags from "../components/Metatags.jsx";
import {useLocation} from "react-router-dom";

function BranchesViews({type_branch}){
    const languagePrefix = useLanguagePrefix();
    const {data: branchesView} = useDrupalData(`/jsonapi/views/branches/${type_branch}`);
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <Metatags type={"view"} data={branchesView} viewUrl={currentPath}/>
            <div className={"branches container"}>
                <div className="branches-view grid grid-cols-2 md:gap-10 gap-20 sm:grid-cols-1">
                    {branchesView?.data?.map((item, index) => (
                        <div key={index} className={"branches-item flex flex-col"}>
                            <ImageComponent
                                url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                imagestyle={"small_large_photoalbums_134_172_"}
                                alt={item?.relationships?.field_image?.data?.meta?.alt}
                            />
                            <h2 className={"branches-item__title"}><a
                                href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
                            </h2>
                            <ContactInformation data={item.attributes} type={"views"}/>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}

BranchesViews.propTypes = {
    type_branch: PropTypes.string.isRequired,
};

export default BranchesViews