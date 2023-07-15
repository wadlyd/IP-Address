import React, { useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import markerIcon from '../images/icon-location.svg';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const MapComponent = ({ userCoordinates }) => {

  function customIcon() {
    return L.icon({
      iconUrl: `${markerIcon}`,
      iconSize: [46, 56]
    })
  }

  function MapController() {
    const map = useMap();
    map.panTo(new L.LatLng(userCoordinates[0], userCoordinates[1]));
    map.setZoom(14);
    return null;
  }


  return (
    <div>
        <MapContainer center={[userCoordinates[0], userCoordinates[1]]} zoomControl={false} scrollWheelZoom={true} className='mapContainer'>
        <MapController />
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
              position={[userCoordinates[0], userCoordinates[1]]}
              icon={customIcon()}
              keyboard={false}
          >
          </Marker>
        </MapContainer>
    </div>
  )
}

export default MapComponent;
