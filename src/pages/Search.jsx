import {useNavigate, useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import {useEffect, useState} from "react";
import useLanguagePrefix from "../services/languagePrefix.jsx";

function Search() {
    const {result} = useParams();
    const navigate = useNavigate(); // Hook to get the navigate function
    const [inputValue2, setInputValue2] = useState(result);

    useEffect(() => {
        setInputValue2(result);
    }, [result]);

    const {data: search} = useDrupalData(`search?search_api_fulltext=${result}`)

    const langPrefix = useLanguagePrefix();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/${langPrefix}/search/${inputValue2}`);
    };

    const handleInputChange = (event) => {
        setInputValue2(event.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className={"enter"} type="text" value={inputValue2} onChange={handleInputChange} />
                <button type="submit">Submit</button>
            </form>
            <div className={""}>
                <h1 className={""}>Results:</h1>

                {search?.rows?.map((item, index) => (
                    <div key={index}>
                        <div dangerouslySetInnerHTML={{__html: item?.title}}/>
                        <div dangerouslySetInnerHTML={{__html: item?.search_api_excerpt}}/>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Search