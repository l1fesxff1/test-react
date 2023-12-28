import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import {toast} from "react-toastify";
import useLanguagePrefix from "../services/languagePrefix.jsx";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function Unsubscriber() {
    const langPrefix = useLanguagePrefix();

    const navigate = useNavigate();
    const {iduser, idnewsletter, timestamp, hash} = useParams();
    const { data: subscriber, isLoading: subscriberLoading } = useDrupalData(`entity/simplenews_subscriber/${iduser}`);
    const { data: newsletter, isLoading: newsletterLoading } = useDrupalData(`entity/simplenews_newsletter/${idnewsletter}`);
    const email = subscriber?.mail?.[0].value;
    const maskedEmail = email
        ? email.replace(/(?<=.{1}).(?=[^@]*?.@)/g, "*")
        : "";

    if (subscriberLoading || newsletterLoading) {
        return null;
    }
    // Check if either subscriber or newsletter is undefined or null
    if (!subscriber || !newsletter) {
        // Redirect to home page
        navigate('/');
        return null;
    }

    // Check if either subscriber or newsletter is undefined or null
    if (subscriber.length < 1 || newsletter.length < 1) {
        // Redirect to home page
        navigate('/');
        return null;
    }
    const handleCancel = () => {
        navigate('/');
    };
    const handleSubmit = (event) => {

        event.preventDefault();

        axios.post(`${baseURL}simplenews/remove/${iduser}/${idnewsletter}/${timestamp}/${hash}/ok`)
            .then((response) => {
                console.log(response.data, response);
                toast.success("Success unsubscribe!");
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to unsubscribe.");

            });
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <p>{(langPrefix === "en" && "This action will unsubscribe you from the newsletter mailing list.") || (langPrefix === "uk" && "Ця дія скасує вашу підписку на розсилку новин.")}
                </p>
                <p>
                    {(langPrefix === "en" && "Are you sure you want to remove") || (langPrefix === "uk" && "Ви впевнені, що хочете видалити")}
                    <em className="placeholder">{maskedEmail}</em> {(langPrefix === "en" && "from the") || (langPrefix === "uk" && "від")}
                    <em className="placeholder">{newsletter?.name}</em> {(langPrefix === "en" && "mailing list?") || (langPrefix === "uk" && "поштову розсилку?")}
                </p>
                <div>
                    <button type="submit">{(langPrefix === "en" && "Unsubscribe") || (langPrefix === "uk" && "Відписатися")}</button>
                    <button onClick={handleCancel}>{(langPrefix === "en" && "Cancel") || (langPrefix === "uk" && "Скасувати")}</button>
                </div>
            </form>
        </>
    );
}

export default Unsubscriber