import useDrupalData from "../services/api.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import React, {useEffect, useState} from "react";
import ContactInformation from "../components/ContactInformation.jsx";
import MapComponent from "../components/MapComponent.jsx";
import Pager from "../components/Pager.jsx";
import Metatags from "../components/Metatags.jsx";
import {useLocation} from "react-router-dom";

function InfrastructureViews(){
    const [apiUrl, setApiUrl] = useState(`/jsonapi/views/infrastructure/page_1`);
    const [jsonData, setJsonData] = useState(null);
    const { data: infrastructureData } = useDrupalData(apiUrl);
    const languagePrefix = useLanguagePrefix();


    const handlePageChange = (page) => {
        setApiUrl(`/jsonapi/views/infrastructure/page_1?page=${page}`);
    };
    useEffect(() => {
        if (infrastructureData) {
            setJsonData(infrastructureData);
        }
    }, [infrastructureData]);

    const totalCount = jsonData?.meta?.pager?.count || 0;
    const itemsPerPage = jsonData?.meta?.pager?.configurations?.items_per_page || 1;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <Metatags type={"view"} data={apiUrl} viewUrl={currentPath} />
            <div className={"container"}>
                <div className={"infrastructure"}>
                    <div className="infrastructure-view md:gap-10 gap-20">
                        {jsonData?.data?.map((item, index) => (
                            <div key={index} className={"infrastructure-item"}>
                                <div className={"infrastructure-item__map"}>
                                    <MapComponent
                                        containerStyle={{width: '100%', height: '100%'}}
                                        address={item?.attributes?.field_location}
                                    />
                                </div>
                                <div className={"infrastructure-item__info"}>
                                    <h2 className={"infrastructure-item__info-title"}><a
                                        href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>{item.attributes.title}</a>
                                    </h2>
                                    <ContactInformation data={item.attributes} type={"views"}/>
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
            </div>
        </>
    );
}

export default InfrastructureViews