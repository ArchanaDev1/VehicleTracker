// Calculate the bearing between two coordinates
export const calculateBearing = ([lat1, lon1], [lat2, lon2]) => {
    const toRad = (angle) => (Math.PI / 180) * angle;
    const toDeg = (radians) => (radians * 180) / Math.PI;
  
    const dLon = toRad(lon2 - lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);
  
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  
    return (toDeg(Math.atan2(y, x)) + 360) % 360; // Bearing in degrees
  };
  