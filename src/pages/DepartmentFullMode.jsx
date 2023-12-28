import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Paragraph from "../components/Paragraph.jsx";
import StaffTitlePosition from "../components/StaffTitlePosition.jsx";
import Metatags from "../components/Metatags.jsx";

function DepartmentFullMode(){
    const { alias } = useParams();
    const {data: department} = useDrupalData(`department/${alias}?_format=json`)
    return(
        <>
            <Metatags type={"content"} data={department} />
            {department?.field_head_of_department &&(
                <StaffTitlePosition staff_id={department?.field_head_of_department?.[0]?.target_id} />
            )}
            {department?.title?.[0]?.value}
            {department?.field_image?.[0]?.target_id &&(
                <div><ImageComponent imagestyle={""} alt={""} url={department?.field_image?.[0]?.target_id} /></div>
            )}
            <div>
                <a href={`https://www.google.com.ua/maps/search/${department?.field_location?.[0]?.value}`}>
                    {department?.field_location?.[0]?.value}
                </a>
            </div>
            <div>
                <a href={`mailto:${department?.field_mail?.[0]?.value}`}>
                    {department?.field_mail?.[0]?.value}
                </a>
            </div>
            {department?.field_phone?.map((phone, index) => (
                <div key={index}>
                    <a href={`tel:${phone.value}`}>{phone.value}</a>
                </div>
            ))}
            <div>
                <a href={department?.field_wiki?.[0]?.uri}>WIKI</a>
            </div>
            <div dangerouslySetInnerHTML={{ __html: department?.field_description?.[0]?.value}} />
            <div className={"Paragraphs"}>
                {department?.field_content?.map((item, index) => (
                    <div className={"section"} key={index}>
                        <Paragraph target_id={item?.target_id}/>
                    </div>
                ))}
            </div>
            <div className={"social_media"}>
                {department?.field_social_media?.[0]?.platform_values?.facebook?.value && (
                    <a href={`https://www.facebook.com/${department?.field_social_media?.[0]?.platform_values?.facebook?.value}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                    </a>
                )}
                {department?.field_social_media?.[0]?.platform_values?.twitter?.value &&(
                    <a href={`https://www.twitter.com/${department?.field_social_media?.[0]?.platform_values?.twitter?.value}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                    </a>
                )}
                {department?.field_social_media?.[0]?.platform_values?.instagram?.value &&(
                    <a href={`https://www.instagram.com/${department?.field_social_media?.[0]?.platform_values?.instagram?.value}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    </a>
                )}
                {department?.field_social_media?.[0]?.platform_values?.website?.value &&(
                    <a href={`${department?.field_social_media?.[0]?.platform_values?.website?.value}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                        </svg>
                    </a>
                )}
            </div>
        </>
    );
}
export default DepartmentFullMode