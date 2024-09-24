import React, { useEffect } from 'react'; 
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { calculateBearing } from '../utils/bearingUtils';

const VehicleMarker = ({ position, route, currentStep, setBearing, bearing }) => {
  useEffect(() => {
    if (currentStep < route.length - 1) {
      const newBearing = calculateBearing(route[currentStep], route[currentStep + 1]);
      setBearing(newBearing);
    }
  }, [currentStep, route, setBearing]);

  return (
    <Marker
      position={position}
      icon={L.divIcon({
        className: 'vehicle-icon',
        html: `<img src='vehicle-icon.png' style='transform: rotate(${bearing}deg); width: 35px; height: 35px;' />`,
      })}
    >
      <Popup>
        <div>
          <strong>Vehicle Details:</strong><br />
          Speed: {3} km/h <br />
          Battery: 85% <br />
          Fuel Efficiency: 20.5 km/l
        </div>
      </Popup>
    </Marker>
  );
};

export default VehicleMarker;
