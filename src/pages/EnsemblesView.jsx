import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Metatags from "../components/Metatags.jsx";
import {useLocation} from "react-router-dom";

function EnsemblesView(){
    const {data: ensembles} = useDrupalData(`ensembles`)
    const {data: ensemblesTitle} = useDrupalData(`jsonapi/views/ensembles/block_1`)
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <Metatags type={"view"} data={ensemblesTitle} viewUrl={currentPath}/>
            {ensembles?.rows?.map((item, index)=> (
                <div key={index}>
                    <div dangerouslySetInnerHTML={{__html: item?.title}} />
                    <ImageComponent alt={item?.field_image_1} imagestyle={"280x280"} url={item?.field_image} />
                    <div dangerouslySetInnerHTML={{__html: item?.field_description}} />
                    <div dangerouslySetInnerHTML={{__html: item?.view_node}} />
                </div>
            ))}
        </>
    )
}
export default EnsemblesView