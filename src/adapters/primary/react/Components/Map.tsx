import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { TCoordinates } from '../../../../hexagon/interfaces';

const containerStyle = {
    with: '100%',
    height: '100%',
};

type TMapProps = {
    coordinates: TCoordinates;
};
export const Map: React.FC<TMapProps> = ({ coordinates }) => (
    <div className="google-map">
        <LoadScript googleMapsApiKey="AIzaSyCw0JQtBgCRLyvmD61wZZaU__THOJxu8fg">
            <GoogleMap
                options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                }}
                center={coordinates}
                zoom={10}
                mapContainerStyle={containerStyle}
            >
                <Marker position={coordinates} />
            </GoogleMap>
        </LoadScript>
    </div>
);
