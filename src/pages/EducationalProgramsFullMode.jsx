import {useParams} from "react-router-dom";
import useDrupalData from "../services/api.jsx";
import EntityTitle from "../components/EntityTitle.jsx";
import ElectiveDisciplines from "../components/ElectiveDisciplines.jsx";
import MainDusciplines from "../components/MainDusciplines.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import Metatags from "../components/Metatags.jsx";

function EducationalProgramsFullMode() {
    const {alias} = useParams();
    const {data: educationalProgramData} = useDrupalData(`/educational-programs/${alias}?_format=json`);
    const langPrefix = useLanguagePrefix();

    return <>
        <Metatags type={"view"} data={educationalProgramData} />
        <div>
            <h2>{educationalProgramData?.title?.[0]?.value}</h2>
            <div>
                <div>{(langPrefix === "en" && "Main disciplines") || ("Перелік нормованих дисциплін")}</div>
                <table>
                    <tbody>
                    <MainDusciplines endpoint={`${educationalProgramData?.nid?.[0].value}`}/>
                    </tbody>
                </table>

            </div>
            <div dangerouslySetInnerHTML={{__html: `${educationalProgramData?.field_description_program?.[0].value}`}}>

            </div>
            <div>
                <div>{(langPrefix === "en" && "List elective disciplines") || ("Перелік вибіркових дисциплін")}</div>
                <ElectiveDisciplines endpoint={`/actual-disciplines/${educationalProgramData?.nid?.[0].value}`}/>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Archive of elective courses") || ("Архів вибіркових дисциплін")}</div>
                <ElectiveDisciplines endpoint={`/old-disciplines/${educationalProgramData?.nid?.[0].value}`}/>
            </div>
        </div>
        <div>
            <div>
                <div>{(langPrefix === "en" && "Validity") || ("Чинність")}</div>
                <div>{educationalProgramData?.field_validity?.[0]?.value}</div>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Form education") || ("Форма навчання")}</div>
                <div>{educationalProgramData?.field_form_educations?.[0]?.value}</div>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Level") || ("Рівень")}</div>
                {educationalProgramData?.field_educational_level?.[0]?.target_uuid && <div><EntityTitle
                    endpoint={`/taxonomy_term/educational_level/${educationalProgramData?.field_educational_level?.[0]?.target_uuid}`}/>
                </div>}
            </div>
            <div>
                <div>{(langPrefix === "en" && "Field of knowledge") || ("Галузь знань")}</div>
                <div>{educationalProgramData?.field_field_of_knowledge?.[0].value}</div>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Special qualification level") || ("Рівень кваліфікації відповідно до Національної рамки кваліфікацій, Європейської рамки кваліфікацій для навчання впродовж життя")}</div>
                <div>{educationalProgramData?.field_special_qualification_lvl?.[0].value}</div>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Employment opportunities") || ("Можливість працевлаштування")}</div>
                <div>{educationalProgramData?.field_employment_opportunities?.[0].value}</div>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Uniqueness and specificity") || ("Унікальність і регіональна специфіка")}</div>
                <div>{educationalProgramData?.field_uniqueness_and_specificity?.[0].value}</div>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Number of credits") || ("Кількість кредитів")}</div>
                <div>{educationalProgramData?.field_number_of_credits?.[0]?.value}</div>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Faculty") || ("Факультет")}</div>
                {educationalProgramData?.field_faculty?.[0]?.target_uuid && <EntityTitle
                    endpoint={`/node/faculty/${educationalProgramData?.field_faculty?.[0]?.target_uuid}`}/>}
            </div>
            <div>
                <div>{(langPrefix === "en" && "Guarantor of the educational programme, contact person") || ("Гарант освітньої програми, контактна особа")}</div>
                {educationalProgramData?.field_guarantor?.[0]?.target_uuid && <EntityTitle
                    endpoint={`/node/staff/${educationalProgramData?.field_guarantor?.[0]?.target_uuid}`}/>}

            </div>
            <div>
                <div>{(langPrefix === "en" && "Qualifications") || ("Кваліфікація")}</div>
                <div><b>{(langPrefix === "en" && "Educational qualifications:") || ("Освітня кваліфікація:")}
                    </b>{educationalProgramData?.field_educational_qualifications?.[0].value}</div>
                <div><b>{(langPrefix === "en" && "Professional qualifications:") || ("Професійна кваліфікація:")}
                </b>{educationalProgramData?.field_professional_qualification?.[0].value}</div>
            </div>
            <div>
                <div>{(langPrefix === "en" && "Specialty") || ("Спеціальність")}</div>
                <div>{educationalProgramData?.field_specialty?.[0]?.target_uuid && <EntityTitle
                    endpoint={`/taxonomy_term/specialty/${educationalProgramData?.field_specialty?.[0]?.target_uuid}`}/>}</div>
            </div>
        </div>
    </>
}

export default EducationalProgramsFullMode