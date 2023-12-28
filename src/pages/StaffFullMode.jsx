import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Orcid from "../assets/orcid.png";
import Scholar from "../assets/scholar.png";
import Scopus from "../assets/scopus.png";
import Wiki from "../assets/wikisnu-new.png";
import React from "react";
import ContactInformation from "../components/ContactInformation.jsx";
import Metatags from "../components/Metatags.jsx";

function StaffFullMode(){
    const { alias } = useParams();
    const {data: staff} = useDrupalData(`staff/${alias}?_format=json`)
    return (
        <>
            <Metatags  type={"content"} data={staff} />
            <div className={"staff container"}>
                {staff?.field_image?.[0]?.target_id && (
                    <ImageComponent imagestyle={"thumbnail"} alt={""} url={staff?.field_image?.[0]?.target_id}/>
                )}
                <h2 className={"staff-title"}>{staff?.title?.[0]?.value}</h2>

                <div className={"staff-info flex flex-row"}>
                    <div className={"staff-info__general flex flex-col w-4/5"}>
                        <p className={"staff-info__general-position"}>{staff?.field_position_and_rank?.[0]?.value}</p>
                        <ContactInformation data={staff} type={"node"}/>
                    </div>
                    <div className={"staff-info__sources flex flex-col w-1/5"}>
                        <div className="staff-info__sources-link">
                            <img src={Wiki} alt={"wiki"}/>
                            <a href={staff?.field_wiki?.[0]?.uri}>
                                Wiki page
                            </a>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Orcid} alt={"orcid"}/>
                            <a href={staff?.field_orcid_id?.[0]?.uri}>
                                Orcid id
                            </a>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Scopus} alt={"scopus"}/>
                            <a href={staff?.field_scopus?.[0]?.uri}>
                                Scopus
                            </a>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Scholar} alt={"scholar"}/>
                            <a href={staff?.field_google_scholar?.[0]?.uri}>
                                Google Scholar
                            </a>
                        </div>
                    </div>
                </div>

                <div className={"staff-wikipedia"}>
                    {staff?.field_links?.map((item, index) => (
                        <div className={"staff-wikipedia__block"} key={index}>
                            <a className="staff-wikipedia__block-link" href={item.uri}>
                                {item.title}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default StaffFullMode