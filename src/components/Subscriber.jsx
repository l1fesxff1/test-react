import axios from "axios";
import {useState} from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDrupalData from "../services/api.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import SocialLinks from "./SocialLinks.jsx";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function Subscriber() {
    const [email, setEmail] = useState('');
    const {data: newsletterBlock} = useDrupalData('admin/content/block/5?_format=json')
    const handleSubmit = (event) => {

        event.preventDefault();

        const submitFormData = {
            mail: [email],
            subscriptions: ["default"],
        };

        axios.post(`${baseURL}entity/simplenews_subscriber`, submitFormData)
            .then((response) => {
                console.log(response.data, response);
                toast.success("Success subscribe!");

            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to subscribe.");

            });
    }

    const langPrefix = useLanguagePrefix();

    return (
        <>
            <div className={"container subscriber-container"}>
                <div className={"flex items-center justify-between pt-[29px] px-0 pb-[34px] subscriber-from-container"}>
                    {newsletterBlock?.info && (
                        <div className={"flex items-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                            </svg>
                            <div className={"text-white"}>
                                {newsletterBlock?.info?.[0]?.value}
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className={"flex w-1/2 relative items-center"}>
                        <input required={"required"} type={"email"} value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder={(langPrefix === "en" && "Enter your email") || (langPrefix === "uk" && "Введіть електронну пошту")}/>
                        <button type="submit">{(langPrefix === "en" && "Subscribe") || (langPrefix === "uk" && "Підписатися")}</button>
                    </form>
                </div>
                <SocialLinks />
            </div>
        </>
    );
}

export default Subscriber