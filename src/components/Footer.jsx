import React, { useState, useEffect } from 'react';
import useDrupalData from "../services/api.jsx";
import ImageComponent from "./ImageComponent.jsx";
import Paragraph from "./Paragraph.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";

// Functional component representing the Footer section
const Footer = () => {
    // State for storing the current date and time
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // Fetching data from Drupal API using custom hook useDrupalData for various components in the Footer
    const {
        data: footerInfoBlockData,
        isLoading: isFooterInfoBlockLoading,
        error: footerInfoBlockError
    } = useDrupalData('jsonapi/block_content/about_the_university/ab52a7ef-b55b-4fec-9dc8-c2038c2e8769');

    const {
        data: footerMenuData,
        isLoading: isFooterMenuLoading,
        error: footerMenuError
    } = useDrupalData('jsonapi/menu_items/footer');

    const {
        data: developmentByBlockData,
        isLoading: isDevelopmentByBlockLoading,
        error: developmentByBlockError
    } = useDrupalData('jsonapi/block_content/block_link/162874d4-fb9b-4763-9d58-e8634414e40c');

    const {
        data: partnersBlockData,
        isLoading: isPartnersBlockLoading,
        error: partnersBlockError
    } = useDrupalData('jsonapi/block_content/footer_bottom_partners/ae849b0d-8e67-409a-ad71-b63483a35fe8');

    const langPrefix = useLanguagePrefix();

    // Effect hook to update the current date and time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    // Formatting the current date and time
    const formattedDate = currentDateTime.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // Rendering the Footer component with the fetched data
    return (
        <div>
            <div>{(langPrefix === 'en' && "Date: ") || "Дата: "}{formattedDate} {(langPrefix === 'en' && "Time: ")|| "Час: "}{formattedTime}</div>

            <div>
                <ImageComponent url={footerInfoBlockData?.data?.relationships?.field_image?.data?.meta?.drupal_internal__target_id} alt={'actual_news'} />
                <div>{footerInfoBlockData?.data?.attributes?.field_main_text}</div>
                <div><a href={`https://www.google.com/maps/search/${footerInfoBlockData?.data?.attributes?.field_location}`}>{footerInfoBlockData?.data?.attributes?.field_location}</a></div>
                <div><span>e-mail: </span><a href={`mailto: ${footerInfoBlockData?.data?.attributes?.field_email}`}>{footerInfoBlockData?.data?.attributes?.field_email}</a></div>
            </div>

            <ul>
                {footerMenuData?.data?.map((item, key) =>
                    <li key={key}><a href={item?.attributes?.url}>{item?.attributes?.title}</a></li>
                )}
            </ul>

            <div>
                <div>Development</div>
                <div><a href={developmentByBlockData?.data?.attributes?.field_link_to?.uri}>{developmentByBlockData?.data?.attributes?.field_link_to?.title}</a></div>
            </div>

            <div>
                {partnersBlockData?.data?.relationships?.field_partner?.data?.map((item, key) =>
                    <div key={key}><Paragraph target_id={item?.meta?.drupal_internal__target_id} /></div>
                )}
            </div>
        </div>
    );
};

export default Footer;
