import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const LiveTracking = () => {
  const [location, setLocation] = useState(center);

  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
         // console.log(position.coords)
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    };

    updateLocation(); // Initial location update

    const intervalId = setInterval(updateLocation, 5000); // Update location every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAP_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;