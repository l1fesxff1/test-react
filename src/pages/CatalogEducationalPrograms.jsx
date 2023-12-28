import React, {useState, useEffect} from 'react';
import useDrupalData from "../services/api.jsx";
import ExposedFilterCatalog from "../components/ExposedFilterCatalog.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import Metatags from "../components/Metatags.jsx";
import {useLocation} from "react-router-dom";

// Functional component for rendering a catalog of educational programs
function CatalogEducationalPrograms() {

    // State for storing filter values and language prefix
    const [filterValues, setFilterValues] = useState({
        title: '',
        field_form_educations_value: 'All',
        field_educational_level_target_id: 'All',
        field_validity_value: 'All',
        field_faculty_target_id: 'All',
    });
    const languagePrefix = useLanguagePrefix();
    const [submitClicked, setSubmitClicked] = useState(false);

    // Function to build the API URL based on filter values
    const buildApiUrl = () => {
        return `/all-educations?views-filter[title]=${filterValues.title}&views-filter[field_form_educations_value]=${filterValues.field_form_educations_value}&views-filter[field_educational_level_target_id]=${filterValues.field_educational_level_target_id}&views-filter[field_validity_value]=${filterValues.field_validity_value}&views-filter[field_faculty_target_id]=${filterValues.field_faculty_target_id}`;
    };

    // Custom hook for fetching Drupal data based on the API URL
    const {data: educationalProgramsData, fetchData} = useDrupalData(buildApiUrl());

    // Effect to refetch data when the submit button is clicked
    useEffect(() => {
        if (submitClicked) {
            fetchData();
            setSubmitClicked(false);
        }
    }, [buildApiUrl(), submitClicked, fetchData]);

    // Handler for updating filter values
    const handleFilterChange = (filter) => {
        setFilterValues(filter);
    };
    const {data: educationalProgramsTitle} = useDrupalData(`jsonapi/views/satalog_of_educational_programs/block_1`)
    const location = useLocation();
    const currentPath = location.pathname;
    // Rendering the catalog of educational programs
    return (
        <div className="education-catalog-page container">
            <Metatags type={"view"} data={educationalProgramsTitle} viewUrl={currentPath}/>
            <h2 className="education-catalog-page__title">
                {(languagePrefix === "en" && "Educational Programs Catalog and Selective Educational Components Catalog") || ("Каталог освітніх програм та вибіркових освітніх компонентів")}
            </h2>
            <div className="education-catalog-filter">
                <ExposedFilterCatalog onFilterChange={handleFilterChange}/>
            </div>
            <table className="education-catalog-table">
                <thead className="education-catalog-table__head">
                <tr>
                    <th className="w-2/6">{(languagePrefix === "en" && "Title") || ("Назва освітньої програми")}</th>
                    <th className="w-2/12">{(languagePrefix === "en" && "Form of study") || ("Форма навчання")}</th>
                    <th className="w-3/12">{(languagePrefix === "en" && "Educational level") || ("Освітній рівень")}</th>
                    <th className="w-3/12">{(languagePrefix === "en" && "Faculty") || ("Факультет")}</th>
                </tr>
                </thead>
                <tbody className="education-catalog-table__body">
                {educationalProgramsData?.rows?.map((item, index) => (
                    <tr key={index} className="education-catalog-table__body-row">
                        <td dangerouslySetInnerHTML={{__html: item?.title}} />
                        <td>{item?.field_form_educations}</td>
                        <td dangerouslySetInnerHTML={{__html: item?.field_educational_level}} />
                        <td dangerouslySetInnerHTML={{__html: item?.field_faculty}}/>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CatalogEducationalPrograms;
