import useDrupalData from "../services/api.jsx";
import PropTypes from "prop-types";
import ImageComponent from "./ImageComponent.jsx";
import React, {useState} from "react";
import dropdownArrow from "/src/assets/dropdown-arrow.png"
import YoutubeEmbed from "./YoutubeEmbed.jsx";

function Paragraph({target_id}) {
    const [isActive, setIsActive] = useState(false);

    const [isActiveDropdown, setisActiveDropdown] = useState(false);

    const handleClick = () => {
        // Змінюємо стан isActive на протилежний
        setIsActive(!isActive);
    };

    const handleClickDropdown = () => {
        // Змінюємо стан isActive на протилежний
        setisActiveDropdown(!isActiveDropdown);
    };
    const {data: paragraph} = useDrupalData(`entity/paragraph/${target_id}`)
    return (
        <>
            {paragraph?.type?.[0]?.target_id === 'section' && (
                <div
                    className={`section-wrapper`}
                >
                    <div onClick={handleClick} className={`section flex ${isActive ? 'open' : ''}`}>
                        <div className={`plus`}></div>
                        <div className={"section-title"}>{paragraph?.field_title?.[0]?.value}</div>
                    </div>
                    {paragraph?.field_subsection?.length > 0 && (
                        <div className={`subsection-wrapper ${isActive ? 'subsection-wrapper-active' : ''}`}>
                            {paragraph?.field_subsection?.map((item, index) => (
                                <div key={index} className={`subsection-item`}>
                                    <Paragraph target_id={item?.target_id}/>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            )}
            {paragraph?.type?.[0]?.target_id == 'dropdown' && (
                <>
                    <div onClick={handleClickDropdown} className={"dropdown items-center flex"}>
                        <div className={`dropdown-arrow ${isActiveDropdown ? 'dropdown-arrow-active' : ''}`}>
                            <img src={dropdownArrow} alt={"arrow"}/>
                        </div>
                        <div className={"dropdown-title"}>{paragraph?.field_title?.[0]?.value}</div>
                    </div>
                    {paragraph?.field_dropdown_info?.map((item, index) => (
                        <div key={index} className={`dropdown_info ${isActiveDropdown ? 'dropdown_info-active' : ''}`}>
                            <Paragraph target_id={item?.target_id}/>
                        </div>
                    ))}
                </>
            )}
            {paragraph?.type?.[0]?.target_id == 'document_body' && (
                <div className={"clearfix-document_body"}>
                    <div className={"document_body"}
                         dangerouslySetInnerHTML={{__html: paragraph?.field_body?.[0]?.processed}}/>
                    <div style={{clear: 'both'}}></div>
                </div>
            )}
            {paragraph?.type?.[0]?.target_id == 'file' && (
                <>
                    {paragraph?.field_file.map((file, index) => (
                        <div className={"dropdown-item flex items-center"} key={index}>
                            <div className={`dropdown-arrow`}>
                                <img src={dropdownArrow} alt={"arrow"}/>
                            </div>
                            <a href={file.url} target={"_blank"} rel={"noopener noreferrer"}>
                                {file.description}
                            </a>
                        </div>

                    ))}
                </>
            )}
            {paragraph?.type?.[0]?.target_id == 'link' && (
                <>
                    {paragraph?.field_link.map((link, index) => (
                        <div className={"dropdown-item flex items-center"} key={index}>
                            <div className={`dropdown-arrow`}>
                                <img src={dropdownArrow} alt={"arrow"}/>
                            </div>
                            <a key={index} href={link.full_url}>{link.title}</a>
                        </div>
                    ))}
                </>
            )
            }
            {paragraph?.type?.[0]?.target_id == 'youtube_link' && (
                <div className={"paragraphs-video"}>
                    {paragraph?.field_youtube_link?.map((link) => (
                        <YoutubeEmbed embedId={link?.uri}/>
                    ))}
                </div>
            )
            }
            {paragraph?.type?.[0]?.target_id == 'image_link' && (
                    <>
                        <a href={paragraph?.field_link_to_partner?.[0]?.uri}>
                            <ImageComponent
                                alt={paragraph?.field_image?.[0]?.alt}
                                url={paragraph?.field_image?.[0]?.target_id}
                                imagestyle={'actual_news'}
                            />
                        </a>
                    </>
                )
            }
            {paragraph?.type?.[0]?.target_id == 'file_preview' && (
                    <>
                        {paragraph?.field_file?.length > 0 && paragraph?.field_file.map((file, index) => (
                            <div key={index}>
                                <iframe width={"100%"} height={"400px"}
                                        src={`https://docs.google.com/gview?embedded=true&url=${file?.url}`}/>
                                <div className={"gdoc-filename"}>{file?.description}</div>
                            </div>
                        ))}
                    </>
                )}
        </>
    );
}

Paragraph.propTypes = {
    target_id: PropTypes.number.isRequired,
};
export default Paragraph