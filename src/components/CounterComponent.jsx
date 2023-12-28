import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

function CounterComponent() {
    const [pageViews, setPageViews] = useState(0);

    useEffect(() => {
        const initialiseAnalytics = () => {
            ReactGA.initialize(import.meta.env.VITE_GA_ID);
        };

        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname + window.location.search);

        setPageViews(prev => prev + 1);
    }, [window.location.pathname, window.location.search]);

    return (
        <div className={"counter-block"}>
            <p>{pageViews} перегляд </p>
        </div>
    );
}

export default CounterComponent;
