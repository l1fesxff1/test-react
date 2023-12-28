import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import Paragraph from "../components/Paragraph.jsx";
import MapComponent from "../components/MapComponent.jsx";
import React from "react";
import Metatags from "../components/Metatags.jsx";

function InfrastructureFullMode() {
    const {alias} = useParams();
    const {data : infrastructure} = useDrupalData(`infrastructure/${alias}?_format=json`);
    return (
        <>
            <Metatags type={"content"} data={infrastructure} />
            <div className={"container"}>
                <div className={"infrastructure"}>
                    {infrastructure?.field_infrastructure_info?.[0]?.target_id && (
                        <div className={"paragraphs"}>
                            {infrastructure?.field_infrastructure_info?.map((item, index) => (
                                <Paragraph key={index} target_id={item?.target_id}/>
                            ))}
                        </div>
                    )}
                    {infrastructure?.field_description?.[0]?.value && (
                        <div className={"infrastructure__description"}
                             dangerouslySetInnerHTML={{__html: infrastructure?.field_description?.[0].value}}
                        />
                    )}
                    {infrastructure?.field_location?.[0]?.value && (
                        <div className={"infrastructure__map"}>
                            <MapComponent
                                containerStyle={{width: '100%', height: '100%'}}
                                address={infrastructure?.field_location?.[0].value}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default InfrastructureFullMode;