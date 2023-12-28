import useDrupalData from "../services/api.jsx";
import Metatags from "../components/Metatags.jsx";
import {useLocation} from "react-router-dom";

function PublicInformation(){
    const {data: publicInformation} = useDrupalData(`public_information`)
    const {data: publicInformationTitle} = useDrupalData(`jsonapi/views/academic_publications/block_1`)
    const location = useLocation();
    const currentPath = location.pathname;
    console.log(publicInformationTitle)
    return(
        <>
            {publicInformationTitle && currentPath && (
                <Metatags type={"view"} data={publicInformationTitle} viewUrl={currentPath}/>
            )}
            {publicInformation?.rows?.length > 0 && publicInformation?.rows?.map((item, index) => (
                    <div key={index}>
                        <span dangerouslySetInnerHTML={{__html: item?.title}}/>
                        <span dangerouslySetInnerHTML={{__html: item?.view_node}}/>
                        <span dangerouslySetInnerHTML={{__html: item?.field_body }}/>
                    </div>
                )
            )}
        </>
    );
}

export default PublicInformation