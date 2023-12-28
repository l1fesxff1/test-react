import React, { useEffect, useState } from "react";
import useDrupalData from "../services/api.jsx";
import ImageComponent from "../components/ImageComponent.jsx";
import Pager from "../components/Pager.jsx";
import {useWindowSize} from "react-use";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import Metatags from "../components/Metatags.jsx";
import {useLocation} from "react-router-dom";

function Photoalbums() {
    const [apiUrl, setApiUrl] = useState("/jsonapi/views/photoalbums_/block_1");
    const [jsonData, setJsonData] = useState(null);
    const { data: albumsData, isLoading: albumsIsLoading, error: albumsError } = useDrupalData(apiUrl);
    const languagePrefix = useLanguagePrefix()

    const size = useWindowSize();
    const [imageStyle, setImageStyle] = useState('');

    useEffect(() => {
        if (size.width < 480) {
            setImageStyle('thumbnail');
        } else {
            setImageStyle('small_large_photoalbums_134_172_');
        }
    }, [size.width]);

    useEffect(() => {
        if (albumsData) {
            setJsonData(albumsData);
        }
    }, [albumsData]);

    const handlePageChange = (page) => {
        setApiUrl(`/jsonapi/views/photoalbums_/block_1?page=${page}`);
    };
    const location = useLocation();
    const currentPath = location.pathname;
    // Calculate total count, items per page, and total pages.
    const totalCount = jsonData?.meta?.pager?.count || 0;
    const itemsPerPage = jsonData?.meta?.pager?.configurations?.items_per_page || 1;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <>
            <Metatags type={"view"} data={apiUrl} viewUrl={currentPath}/>
            <div className={"albums container"}>
                <div className={"albums-view flex flex-wrap xl:justify-start justify-center"}>
                    {jsonData?.data?.map((item, index) => (
                        <div className={"albums-card"} key={index}>
                            <a className={"albums-card__title"}
                               href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
                            <div className={"albums-card__img"}>
                                <ImageComponent
                                    url={item?.relationships?.field_image?.data?.meta?.drupal_internal__target_id}
                                    imagestyle={imageStyle}
                                    alt={item?.relationships?.field_image?.data?.meta?.alt}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                {itemsPerPage > 1 && totalPages > 1 && (
                    <div className={"pager flex justify-center mt-[20px]"}>
                        <Pager totalPages={totalPages} onPageChange={handlePageChange}/>
                    </div>
                )}
            </div>
        </>
    );
}

export default Photoalbums;
