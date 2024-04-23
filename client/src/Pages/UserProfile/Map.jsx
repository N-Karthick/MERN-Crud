import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const MapContainer = (props) => {
  const [userLocation, setUserLocation] = useState(null);
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting geolocation:', error);
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []); 
    return (
    <>
      {userLocation && (
        <Map
          google={props.google}
          zoom={14}
          style={{ width: '60%', height: '60%' }}
          initialCenter={{
            lat: userLocation.lat,
            lng: userLocation.lng,
          }}
        >
          <Marker
            title={'Your Location'}
            position={{
              lat: userLocation.lat,
              lng: userLocation.lng,
            }}
          />
        </Map>
      )}
      <div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />    
        {userLocation && (
          <>
            <p>Latitude: {userLocation.lat}</p>
            <p>Longitude: {userLocation.lng}</p>
          </>
        )}
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDGW-y_dvNLzrcBHQZLkT6lCyyNb3cIPzA'
})(MapContainer);
