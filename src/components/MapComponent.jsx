import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { fromAddress, setDefaults } from 'react-geocode';
import PropTypes from 'prop-types';
import * as logger from 'react-dom/test-utils';

function MapComponent({ address, containerStyle }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_API_KEY,
    });

    const defaultSettings = {
        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        disableDoubleClickZoom: false,
        scrollwheel: false,
        fullscreenControl: false,
        clickableIcons: true,
        rotateControl: false,
        streetViewControl: false,
        zoomControlOptions: false,
    };

    const [maps, setMap] = useState(null);
    const [center, setCenter] = useState(null);

    setDefaults({
        key: import.meta.env.VITE_API_KEY,
        language: 'en',
        region: 'eu',
    });

    // Fetching the coordinates from the provided address and updating the center state.
    useEffect(() => {
        if (address) {
            fromAddress(address)
                .then(({ results }) => {
                    const { lat, lng } = results[0].geometry.location;
                    setCenter({ lat, lng });
                })
                .catch((error) => {
                    logger.error('Error fetching coordinates:', error);
                });
        }
    }, [address]);

    // Callback function for handling map load.
    const onLoad = React.useCallback(
        function callback(map) {
            if (center) {
                const bounds = new window.google.maps.LatLngBounds(center);
                map.fitBounds(bounds);
            }

            setMap(map);
        },
        [center],
    );

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            options={defaultSettings}
            zoom={18}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
             <Marker position={center} />
        </GoogleMap>
    ) : null;
}

MapComponent.propTypes = {
    address: PropTypes.string,
    containerStyle: PropTypes.object,
};

export default MapComponent;
