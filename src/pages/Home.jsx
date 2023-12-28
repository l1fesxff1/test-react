import useDrupalData from "../services/api.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, {useState, useEffect} from 'react'
import MapComponent from "../components/MapComponent.jsx";
import {FacebookProvider, Page} from "react-facebook";
import MainSlider from "../components/MainSlider.jsx";
import ActualNewsBlock from "../components/ActualNewsBlock.jsx";
import LastNewsBlock from "../components/LastNewsBlock.jsx";
import EventsSlider from "../components/EventsSlider.jsx";
import PollBlock from "../components/PollBlock.jsx";
import AlbumsSlider from "../components/AlbumsSlider.jsx";
import useLanguagePrefix from "../services/languagePrefix.jsx";
import YoutubeEmbed from "../components/YoutubeEmbed.jsx";
import Metatags from "../components/Metatags.jsx";


// Functional component for the Home page
function Home() {
    // Using the useDrupalData hook to fetch data for various components
    const {
        data: actualNewsData,
        isLoading: isActualNewsLoading,
        error: actualNewserror
    } = useDrupalData('jsonapi/views/actual_news/block_1');
    const {
        data: lastNewsData,
        isLoading: isLastNewsLoading,
        error: lastNewsError
    } = useDrupalData('jsonapi/views/last_news/block_1');
    const {
        data: eventsBlockData,
        isLoading: isEventsBlockDataLoading,
        error: eventsBlockDataError
    } = useDrupalData('jsonapi/views/events_coming_soon/block_1');
    const {
        data: sliderData,
        isLoading: isSliderLoading,
        error: sliderError
    } = useDrupalData('jsonapi/views/slider/block_1');
    const {
        data: pollBlockData,
        isLoading: isPollBlockLoading,
        error: pollBlockError
    } = useDrupalData('jsonapi/views/polls/block_1');
    const {
        data: pollResultData,
        isLoading: isPollResultDataLoadin,
        error: pollResultDataError
    } = useDrupalData('poll-vote-result/rest-export/1');
    const {
        data: infrastructureBlockdata,
        isLoading: isInfrastructureBlockLoadin,
        error: infrastructureBlockError
    } = useDrupalData('jsonapi/views/infrastructure/block_1');
    const {
        data: sliderAlbumsData,
        isLoading: isSliderAlbumsLoading,
        error: sliderAlbumsError
    } = useDrupalData('/jsonapi/views/photoalbums_/block_1');
    const {
        data: facebookBlockData,
        isLoading: isFacebookBlockLoadin8,
        error: facebookBlockDataError
    } = useDrupalData('jsonapi/block_content/block_link/9997e437-90d7-49d1-98c6-d8c11bb4db04');
    const {
        data: youtubeBlockData,
        isLoading: isYoutubeBlockLoadin,
        error: youtubeBlockError
    } = useDrupalData('jsonapi/block_content/block_link/4e904849-61c6-45d4-93de-89539abdf33a');

    const [pageWidth, setPageWidth] = useState("100%"); // Set initial width
    const langPrefix = useLanguagePrefix();
    // Update width based on screen size
    useEffect(() => {
        setPageWidth(window.innerWidth > 900 ? "350px" : "300px");
    }, []);

    const isLoading =
        isActualNewsLoading ||
        isLastNewsLoading ||
        isEventsBlockDataLoading ||
        isSliderLoading ||
        isPollBlockLoading ||
        isPollResultDataLoadin ||
        isInfrastructureBlockLoadin ||
        isFacebookBlockLoadin8 ||
        isYoutubeBlockLoadin;

    // Rendering the components based on fetched data or loading state
    return (
        <div>
            <Metatags type={"front"} />
            {isLoading ? (
                // Display loading message while data is loading
                <div>Loading...</div>
            ) : (
                // Render components when data is loaded
                <>
                    <MainSlider data={sliderData}/>
                    <div className="actual-news-block">
                    <ActualNewsBlock data={actualNewsData}/>
                    </div>
                    <div className="last-news-block">
                        <h2 className="last-news-block__block-title"><a href={`/${langPrefix}/news`}>{lastNewsData?.meta?.title}</a></h2>
                        <LastNewsBlock data={lastNewsData}/>
                    </div>
                    <div className="events-slider">
                        <h2 className="events-slider__block-title"><a href={`/${langPrefix}/events`}>{eventsBlockData?.meta?.title}</a></h2>
                        <EventsSlider data={eventsBlockData}/>
                    </div>
                    <div className='homepage-bottom'>
                        <div className="poll-block">
                        <h3 className="poll-block__title title"><a href='#'>{pollBlockData?.meta.title}</a></h3>
                        <PollBlock pollData={pollBlockData} resultData={pollResultData}/>
                    </div>
                    {/* Rendering the infrastructure location */}
                    {/*<div>{infrastructureBlockdata?.data?.[0]?.attributes?.field_location}</div>*/}
                    {infrastructureBlockdata?.data?.[0]?.attributes?.field_location && <div className="infrastructure-block">
                        <h3 className="infrastructure-block__title title"><a href='#'>{infrastructureBlockdata?.meta.title}</a></h3>
                        <div className="infrastructure-block__map-block">
                            <MapComponent
                                containerStyle={{ width: '350px', height: '450px' }}
                                address={infrastructureBlockdata?.data?.[0]?.attributes?.field_location}
                            />
                        </div>
                    </div>}

                     <div className="photoalbum-block">
                         <h3 className="photoalbum-block__title title"><a href={`/${langPrefix}/photoalbums`}>{sliderAlbumsData?.meta.title}</a></h3>
                         <AlbumsSlider data={sliderAlbumsData}/>
                     </div>
                    {/* Rendering the Facebook component if Facebook link exists */}
                    {facebookBlockData?.data?.attributes?.field_link_to?.uri && <div className="facebook-block">
                        <h3 className="facebook-block__title title"><a
                            href={facebookBlockData?.data?.attributes?.field_link_to?.uri}>{facebookBlockData?.data?.attributes?.info}</a>
                        </h3>
                        <FacebookProvider appId='1453142571919005'>
                            <Page width={pageWidth} height="450" href={facebookBlockData?.data?.attributes?.field_link_to?.uri} tabs="timeline"/>
                        </FacebookProvider>
                    </div>}
                    {/* Rendering the YouTube component if YouTube link exists */}
                    {youtubeBlockData?.data?.attributes?.field_link_to?.uri && (
                        <div className="youtube-block">
                            <h3 className="youtube-block__title title"><a
                                href={youtubeBlockData?.data?.attributes?.field_link_to?.uri}>{youtubeBlockData?.data?.attributes?.info}</a>
                            </h3>
                            <div className="youtube-block__video-block">
                                <YoutubeEmbed embedId={youtubeBlockData?.data?.attributes?.field_link_to?.uri}/>
                            </div>
                        </div>
                    )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;