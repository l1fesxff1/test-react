import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Metatags from "../components/Metatags.jsx";

function EnsemblesFullMode(){
    const { alias } = useParams();
    const {data: ensemblesFullMode} = useDrupalData(`ensembles/${alias}?_format=json`)
    return(
        <>
            <Metatags type={"content"} data={ensemblesFullMode} />
            <ImageComponent alt={ensemblesFullMode?.field_image?.[0]?.alt} url={ensemblesFullMode?.field_image?.[0]?.target_id} imagestyle={"280x280"} />
            <div dangerouslySetInnerHTML={{__html: ensemblesFullMode?.field_description?.[0]?.processed}} />
        </>
    );
}
export default EnsemblesFullMode