import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import './Leaflet.css';

function Leaflet() {
  const location = useLocation();
  const { source, destination, currentLocation } = location.state || {};

  if (!source || !destination || !currentLocation) {
    return <div>Error: Missing location data.</div>;
  }

  const customIcon = new Icon({
    iconUrl:"https://img.icons8.com/ios-filled/50/truck.png",
    iconSize:[35, 35]
  })

  return (
    <div className='leaflet-container'>
    <MapContainer center={[currentLocation.lat, currentLocation.long]} zoom={10} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[source.lat, source.long]}>
        <Popup>
         starting location
        </Popup>
      </Marker>  
       <Marker position={[destination.lat, destination.long]}   >
        <Popup>
          Destination
        </Popup>
      </Marker>
      <Marker position={[currentLocation.lat, currentLocation.long]}  icon = {customIcon}>
        <Popup>
          Current vehicle Location
        </Popup>
      </Marker>
    </MapContainer></div>
  );
}

export default Leaflet;