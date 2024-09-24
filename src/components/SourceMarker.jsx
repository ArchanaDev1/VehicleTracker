import React from 'react'; 
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const sourceIcon = new L.Icon({
  iconUrl: 'source-icon.png',
  iconSize: [30, 30],
});

const SourceMarker = ({ position }) => {
  if (!position) return null;

  return <Marker position={position} icon={sourceIcon} />;
};

export default SourceMarker;
