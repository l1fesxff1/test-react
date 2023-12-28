import useLanguagePrefix from "../services/languagePrefix.jsx";
function ReadMore(){
    const langPrefix = useLanguagePrefix()
    return <>
        {langPrefix === 'en' && <>Read more</>}
        {langPrefix === 'uk' && <>Детальніше</>}
    </>
}

export default ReadMore