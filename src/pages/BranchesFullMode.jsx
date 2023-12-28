import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import ContactInformation from "../components/ContactInformation.jsx";
import Paragraph from "../components/Paragraph.jsx";
import Metatags from "../components/Metatags.jsx";
import ImageLightBox from "../components/ImageLightBox.jsx";
import React from "react";

function BranchesFullMode(){
    const { alias } = useParams();
    const {data: branchesPage} = useDrupalData(`branches-and-representative-offices/${alias}?_format=json`);
    const node_id = branchesPage?.field_reference_to_content?.[0]?.target_id;
    const {data: photoalbumsNode} = useDrupalData(`node/${node_id}?_format=json`);
    return (
        <>
            <Metatags type={"content"} data={branchesPage}/>
            <div className={"branches container"}>
                <div className={"branches-info flex flex-row"}>
                    {branchesPage?.field_image?.[0]?.target_id && (
                        <ImageComponent imagestyle={"dynamicdata_243x231"} alt={""}
                                        url={branchesPage?.field_image?.[0]?.target_id}/>
                    )}
                    <div className={"branches-info__contact"}>
                        <h2 className={"branches-info__contact-title"}>{branchesPage?.title?.[0]?.value}</h2>
                        <ContactInformation data={branchesPage} type={"node"}/>
                    </div>
                </div>
                {branchesPage?.field_reference_to_content?.[0]?.target_id && (
                    <div className={"branches-child-node"}>
                        {branchesPage?.field_reference_to_content?.map(() => (
                            <ImageLightBox data={photoalbumsNode}/>
                        ))}
                    </div>
                )}
                {branchesPage?.field_content?.[0]?.target_id && (
                    <div className={"branches-paragraphs"}>
                        {branchesPage?.field_content?.map((item, index) => (
                            <div className={"section"} key={index}>
                                <Paragraph target_id={item?.target_id}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>

    );
}

export default BranchesFullMode