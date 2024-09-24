import React from 'react'; 
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const destinationIcon = new L.Icon({
  iconUrl: 'destination-icon.png',
  iconSize: [30, 30],
});

const DestinationMarker = ({ position }) => {
  if (!position) return null;

  return <Marker position={position} icon={destinationIcon} />;
};

export default DestinationMarker;
