import { useState, useEffect } from 'react';
import axios from 'axios';

// Retrieve the base URL from the Vite environment variables.
const baseURL = import.meta.env.VITE_BACKEND_URL;

// Define a function to fetch data from the Drupal backend using Axios.
const fetchDataFromDrupal = async (endpoint) => {
    try {
        // Make a GET request to the specified endpoint and retrieve the response data.
        const response = await axios.get(`${baseURL}/${endpoint}`);
        return response.data;
    } catch (error) {
        // Log and throw an error if there's an issue fetching data from Drupal.
        console.error('Error fetching data from Drupal:', error);
        throw error;
    }
};

// Define a custom hook for fetching data from Drupal.
const useDrupalData = (endpoint) => {
    // Set up state variables for data, loading status, and potential errors.
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Determine language from the URL prefix.
    const language = window.location.pathname.split('/')[1]; // Assumes language is the first part of the path.
    // Use the useEffect hook to fetch data when the component mounts or the endpoint changes.
    useEffect(() => {
        // Define an asynchronous function to fetch data and update state accordingly.
        const fetchData = async () => {
            try {
                // Call the fetchDataFromDrupal function to get data from Drupal.
                var result;
                if(endpoint.split('/')[1] == 'en' || endpoint.split('/')[1] == 'uk'){
                    result = await fetchDataFromDrupal(endpoint);
                }else{
                    result = await fetchDataFromDrupal(language + '/' + endpoint);
                }


                // Update state with the fetched data and set loading to false.
                setData(result);
                setIsLoading(false);
            } catch (error) {
                // If there's an error, update state with the error and set loading to false.
                setError(error);
                setIsLoading(false);
            }
        };

        // Call the fetchData function when the component mounts or the endpoint changes.
        fetchData();
    }, [endpoint, language]);

    // Return the data, loading status, and error to be used by the component.
    return { data, isLoading, error };
};

// Export the useDrupalData hook for use in other parts of the application.
export default useDrupalData;
