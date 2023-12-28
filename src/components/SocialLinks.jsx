import useDrupalData from "../services/api.jsx";
import facebook from "/src/assets/facebook-icon.png"
import twitter from "/src/assets/twitter.png"
import instagram from "/src/assets/instagram.png"

function SocialLinks(){
    const {data: socialLinksBlock} = useDrupalData(`jsonapi/block_content/social_links/89007644-1c79-4023-9849-2a080761f6ba`)
    return <div className={"social-links_block"}>
        <a target={`_blank`} href={`https://www.facebook.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.facebook?.value}`}><img
            src={facebook} alt="" width={"40"} height={"40"}/></a>
        <a target={`_blank`} href={`https://www.twitter.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.twitter?.value}`}><img
            src={twitter} alt="" width={"40"} height={"40"}/></a>
        <a target={`_blank`} href={`https://www.instagram.com/${socialLinksBlock?.data?.attributes?.field_social_links?.platform_values?.instagram?.value}`}><img
            src={instagram} alt="" width={"40"} height={"40"}/></a>
    </div>
}

export default SocialLinks