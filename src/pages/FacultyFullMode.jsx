import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Paragraph from "../components/Paragraph.jsx";
import StaffTeaser from "../components/StaffTeaser.jsx";
import Departments from "../components/Departments.jsx";
import ContactInformation from "../components/ContactInformation.jsx";
import React from "react";
import Metatags from "../components/Metatags.jsx";

function FacultyFullMode(){
    const { alias } = useParams();
    const {data: faculty} = useDrupalData(`faculty/${alias}?_format=json`)
    return (
        <>
            <Metatags type={"content"} data={faculty} />
            {faculty?.nid?.[0]?.value &&(
                <Departments id_deparments={faculty?.nid?.[0]?.value} />
            )}
            {faculty?.field_head_of_faculty?.length > 0 &&(
                <StaffTeaser staff_id={faculty?.field_head_of_faculty?.[0].target_id}/>
            )}
            <div>{faculty?.title?.[0]?.value}</div>
            {faculty?.field_image?.[0]?.target_id &&(
                <div><ImageComponent imagestyle={"thumbnail"} alt={""} url={faculty?.field_image?.[0]?.target_id} /></div>
            )}
            <ContactInformation data={faculty} type={"node"}/>
            <div dangerouslySetInnerHTML={{__html: faculty?.field_description?.[0]?.value}}/>
            <div className={"paragraphs"}>
                {faculty?.field_content?.map((item, index) => (
                    <div className={"section"} key={index}>
                        <Paragraph target_id={item?.target_id}/>
                    </div>
                ))}
            </div>
            <div className={"social_media"}>
                {faculty?.field_social_links_of_the_facult?.[0]?.platform_values?.facebook?.value &&(
                    <a href={`https://www.facebook.com/${faculty?.field_social_links_of_the_facult?.[0]?.platform_values?.facebook?.value}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                    </a>
                )}
                {faculty?.field_social_links_of_the_facult?.[0]?.platform_values?.twitter?.value &&(
                    <a href={`https://www.twitter.com/${faculty?.field_social_links_of_the_facult?.[0]?.platform_values?.twitter?.value}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                    </a>
                )}
                {faculty?.field_social_links_of_the_facult?.[0]?.platform_values?.instagram?.value &&(
                    <a href={`https://www.instagram.com/${faculty?.field_social_links_of_the_facult?.[0]?.platform_values?.instagram?.value}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    </a>
                )}
            </div>
        </>
    );
}
export default FacultyFullMode