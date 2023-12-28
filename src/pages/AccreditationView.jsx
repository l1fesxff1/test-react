import useDrupalData from "../services/api.jsx";
import Metatags from "../components/Metatags.jsx";
import {useLocation} from "react-router-dom";

function AccreditationView(){
    const {data: accreditaionTitle} = useDrupalData(`jsonapi/views/academic_publications/block_2`);
    const {data: accreditationView} = useDrupalData(`accreditation`);
    const location = useLocation();
    const currentPath = location.pathname;
    return(
        <>
            {accreditaionTitle && currentPath && (
                <Metatags type={"view"} data={accreditaionTitle} viewUrl={currentPath}/>
            )}
            {accreditationView?.rows?.length > 0 && accreditationView?.rows?.map((item, index) => (
                    <div key={index}>
                        <div dangerouslySetInnerHTML={{__html: item?.title}}/>
                        <div dangerouslySetInnerHTML={{__html: item?.view_node}}/>
                    </div>
                )
            )}
        </>
    );
}
export default AccreditationView