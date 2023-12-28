import ChoiceComponent from "./ChoiceComponent.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import useLanguagePrefix from "../services/languagePrefix.jsx";

// Functional component for rendering a poll block
function PollBlock({pollData, resultData}) {
    // State variables for IP address, form visibility, and total votes
    const [ip, setIP] = useState("");
    const [showForm1, setShowForm1] = useState(true);

    // Function to toggle the visibility of the poll form
    const handleButtonClick = () => {
        setShowForm1(!showForm1);
    };

    // Calculating the total number of votes
    const totalVotes = resultData?.data?.reduce((acc, choice) => acc + parseInt(choice?.attributes?.vote_count, 10), 0);

    // Function to fetch user's IP address
    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        setIP(res.data.ip);
    };

    // Fetching IP address on component mount
    useEffect(() => {
        getData();
    }, []);

    // Function to handle form submission
    const handleSubmit1 = (event) => {

        event.preventDefault();

        const formData = new FormData(event.target);
        const selectedValue = formData.get('choice');
        const pollId = formData.get('pollId');
        const currentTimestamp = new Date().getTime();


        const submitFormData = {
            chid: selectedValue,
            pid: pollId,
            uid: "0",
            hostname: ip,
            timestamp: Math.floor(currentTimestamp / 1000).toString(),
        };

        axios.post('http://128.140.43.32/poll-vote/post-data', submitFormData)
            .then((response) => {
                console.log(response.data, response);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const langPrefix = useLanguagePrefix();

    return (
        <>
            {/* Mapping through the array of polls */}
            {pollData?.data?.map((poll) => (
                <div key={poll?.attributes?.question} className="poll-block__block">
                    {/* Displaying the question of the poll */}
                    <div className="poll-block__question">{poll?.attributes?.question}</div>

                    {/* Conditional rendering based on form visibility */}
                    {showForm1 ? (
                        // Form for voting
                        <form className="poll-block__form" onSubmit={handleSubmit1}>
                            <input type="hidden" name="pollId" value={poll?.attributes?.drupal_internal__id}/>
                            {poll?.relationships?.choice?.data?.map((choice, index) => (
                                <div key={choice.id} className="poll-block__choice-item">
                                    <input
                                        type="radio"
                                        name="choice"
                                        value={choice?.meta?.drupal_internal__target_id}
                                    />
                                    <label><ChoiceComponent
                                        choiceId={poll.relationships?.choice?.data?.[index]?.id}/></label>
                                </div>
                            ))}
                            <button type="submit" className="poll-block__form-submit button">{langPrefix === 'en' && <>Send</>}{langPrefix === 'uk' && <>Надіслати</>}</button>
                            <button onClick={handleButtonClick} className="poll-block__switch button">{langPrefix === 'en' && <>View results</>}{langPrefix === 'uk' && <>Переглянути результати</>}</button>
                        </form>
                    ) : (
                        // View results section
                        <div>
                            {resultData?.data?.map((choice1, index) => {
                                return (
                                    <div key={index}>
                                        <ChoiceComponent
                                            choiceId={pollData?.data?.[0]?.relationships?.choice?.data?.[index]?.id}/>
                                        {/* Display the percentage */}
                                        {totalVotes > 0 && (
                                            <>
                                                {((choice1?.attributes?.vote_count / totalVotes) * 100).toFixed(0)}%{' '}
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={((choice1?.attributes?.vote_count / totalVotes) * 100).toFixed(0)}
                                                    disabled
                                                />
                                                ({choice1?.attributes?.vote_count} vote{choice1?.attributes?.vote_count !== 1 ? 's' : ''})
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                            <div>Total votes: {totalVotes}</div>
                            <button onClick={handleButtonClick} className="poll-block__switch button">Переглянути опитування</button>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}

PollBlock.propTypes = {
    pollData: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
    resultData: PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.array.isRequired,
    ]),
};

export default PollBlock