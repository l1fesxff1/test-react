import { useEffect, useState } from "react";
import axios from "axios";

// Retrieving the base URL from environment variables
const baseURL = import.meta.env.VITE_BACKEND_URL;

// Function component for language switching
function LanguageSwitcher() {
    // Extracting current language, URL parts, and type from the window location
    const currentLang = window.location.pathname.split('/')[1];
    const currentUrl = window.location.pathname;
    const urlParts = currentUrl.split('/');
    const type = window.location.pathname.split('/')[2];
    const alias = window.location.pathname.split('/')[3];
    const slicedUrl = urlParts.slice(2).join('/');

    // State variables for data, loading state, and switching language
    const [data, setData1] = useState(null);
    const [loading, setLoading] = useState(true);

    // Effect to fetch data based on the current language and URL
    useEffect(() => {
        const fetchData1 = async () => {
            try {
                if ((type !== "simplenews") && (type !== "search") && (slicedUrl)) {
                    const response = await axios.get(`${baseURL}/${currentLang}/${slicedUrl}?_format=json`);
                    setData1(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData1();
    }, []);

    // Switching the language
    var switchLang;
    if (currentLang === 'uk') {
        switchLang = 'en';
    } else if (currentLang === 'en') {
        switchLang = 'uk';
    }

    // State variables for another set of data and loading state
    const [data2, setData2] = useState(null);

    // Effect to fetch data based on the switched language and alias
    useEffect(() => {
        const fetchData2 = async () => {
            try {
                if (data && alias) {
                    const response = await axios.get(`${baseURL}/${switchLang}/node/${data?.nid?.[0].value}?_format=json`);
                    setData2(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData2();
    }, [data]);

    // Rendering the language switcher based on conditions
    return (
        <div className="language-switcher">
            <div className="dropdown">
                <button className="dropdown-btn">
                    {(currentLang === "en" && "English") || ("Українська")}
                </button>
                <div className="dropdown-content">
                    {(alias && <div>
                            {(data2?.path?.[0].alias &&
                                <a href={`/${switchLang}${data2?.path?.[0].alias}`}>{(currentLang === "en" && "Ukrainian") || ("Англійська")}</a>) || (
                                <a href={`/${switchLang}/${slicedUrl}`}>{(currentLang === "en" && "Ukrainian") || ("Англійська")}</a>)}
                        </div>) ||
                        ((!alias && slicedUrl) && <div>
                            <a href={`/${switchLang}/${slicedUrl}`}>{(currentLang === "en" && "Ukrainian") || ("Англійська")}</a>
                        </div>) ||
                        ((!alias && !slicedUrl) && <div>
                            <a href={`/${switchLang}`}>{(currentLang === "en" && "Ukrainian") || ("Англійська")}</a>
                        </div>)}
                    <a href={`${currentUrl}`}>
                        {(currentLang === "en" && "English") || ("Українська")}
                    </a>
                </div>
            </div>
        </div>
    );
}

// Exporting the LanguageSwitcher component
export default LanguageSwitcher;
