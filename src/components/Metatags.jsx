import {Helmet} from "react-helmet";
import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";

function Metatags({type , data, viewUrl}){
    const frontUrl = import.meta.env.VITE_FRONTEND_URL;
    const backUrl = import.meta.env.VITE_BACKEND_URL;
    const {data: siteInfo} = useDrupalData(`site/info?_format=json`)
    const {data: metatagBlock} = useDrupalData(`jsonapi/metatag_defaults/metatag_defaults/c83d2f3a-7988-4ca5-9200-db72b073bdb2`)
    const ogImageUrl = data?.field_metatags_image?.[0]?.url || data?.field_image?.[0]?.url || siteInfo?.logo;
    const description = data?.field_description?.[0]?.summary;
    const metaTitle = data?.title?.[0]?.value;
    const nodeUrl = `${backUrl}${data?.path?.[0]?.langcode}${data?.path?.[0]?.alias}`;
    const keywords = metatagBlock?.data?.attributes?.tags?.keywords;
    const viewTitle = data?.meta?.title;
    return(
        <>
            <Helmet>
                {type === "view" && viewTitle && siteInfo && (
                    <title>{`${viewTitle} | ${siteInfo.name}`}</title>
                )}

                {type === "content" && metaTitle && siteInfo && (
                    <title>{`${metaTitle} | ${siteInfo.name}`}</title>
                )}

                {siteInfo?.logo && (
                    <link rel={"icon"} type={"image/png"} href={siteInfo?.logo}/>
                )}

                {type !== "view" && type !== "content" && siteInfo && (
                    <title>{`${siteInfo.name} | ${siteInfo.slogan}`}</title>
                )}
                <meta id="og-image" property="og:image" content={"https://media.istockphoto.com/id/1432956286/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B2%D0%B8%D0%B4-%D0%B7-%D0%B2%D0%B8%D1%81%D0%BE%D1%82%D0%B8-%D0%BF%D1%82%D0%B0%D1%88%D0%B8%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BF%D0%BE%D0%BB%D1%8C%D0%BE%D1%82%D1%83-%D0%BD%D0%B0-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%96-%D0%B0%D0%BF%D0%B5%D0%BB%D1%8C%D1%81%D0%B8%D0%BD%D0%BE%D0%B2%D1%96-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%B0-%D0%BD%D0%B0-%D0%BF%D0%B0%D0%B3%D0%BE%D1%80%D0%B1%D1%96-%D1%96-%D0%B3%D0%BE%D1%80%D0%B8-%D0%B2-%D0%BD%D0%B8%D0%B7%D1%8C%D0%BA%D0%B8%D1%85.jpg?s=2048x2048&w=is&k=20&c=J8sfvzKNxJJBlFWJ7MPbzKdcHCMkGnTnkwU4ePq_vrg="} />
                <meta id="og-image-url" property="og:image:url" content={"https://media.istockphoto.com/id/1432956286/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B2%D0%B8%D0%B4-%D0%B7-%D0%B2%D0%B8%D1%81%D0%BE%D1%82%D0%B8-%D0%BF%D1%82%D0%B0%D1%88%D0%B8%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BF%D0%BE%D0%BB%D1%8C%D0%BE%D1%82%D1%83-%D0%BD%D0%B0-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%96-%D0%B0%D0%BF%D0%B5%D0%BB%D1%8C%D1%81%D0%B8%D0%BD%D0%BE%D0%B2%D1%96-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%B0-%D0%BD%D0%B0-%D0%BF%D0%B0%D0%B3%D0%BE%D1%80%D0%B1%D1%96-%D1%96-%D0%B3%D0%BE%D1%80%D0%B8-%D0%B2-%D0%BD%D0%B8%D0%B7%D1%8C%D0%BA%D0%B8%D1%85.jpg?s=2048x2048&w=is&k=20&c=J8sfvzKNxJJBlFWJ7MPbzKdcHCMkGnTnkwU4ePq_vrg="} />
                <meta property="og:image:width" content="600" />
                <meta property="og:image:height" content="400" />

                {description && type === "content" && <meta name="description" content={description} />}

                {type === "front" && frontUrl && (
                    <link rel="shortlink" href={frontUrl}/>
                )}
                {type === "front" && frontUrl && keywords && (
                    <meta name="keywords" content={keywords}/>
                )}

                {type === "content" && (
                    <link rel="canonical" href={nodeUrl} />
                )}
                {frontUrl && type === "front" && (
                    <link rel="canonical" href={frontUrl} />
                )}
                {frontUrl && type === "view" && viewUrl && (
                    <link rel="canonical" href={`${frontUrl}${viewUrl}`} />
                )}

            </Helmet>
        </>
    );
}

Metatags.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.arrayOf(
                    PropTypes.shape({
                        value: PropTypes.string,
                    })
                ),
                field_metatags_image: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string,
                    })
                ),
                field_image: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string,
                    })
                ),
                field_description: PropTypes.arrayOf(
                    PropTypes.shape({
                        summary: PropTypes.string,
                    })
                ),
                path: PropTypes.arrayOf(
                    PropTypes.shape({
                        langcode: PropTypes.string,
                        alias: PropTypes.string,
                    })
                ),
            })
        ),
    ]),
    viewUrl: PropTypes.string,
};
export default Metatags