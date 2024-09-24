import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import VehicleMarker from './components/VehicleMarker';
import SourceMarker from './components/SourceMarker';
import DestinationMarker from './components/DestinationMarker';
import ControlPanel from './components/ControlPanel';
import { fetchRoute } from './utils/routeUtils';
import { haversineDistance } from './utils/distanceUtils';

const App = () => {
  const [route, setRoute] = useState([]); // Full route along roads
  const [currentStep, setCurrentStep] = useState(0); // Current step of the vehicle on the route
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(3); // Default speed
  const [totalDistance, setTotalDistance] = useState(0); // Total route distance
  const [distanceCovered, setDistanceCovered] = useState(0); // Distance covered by the vehicle
  const [bearing, setBearing] = useState(0); // Current bearing (direction)

  useEffect(() => {
    const fetchAndCalculateRoute = async () => {
      const routeData = await fetchRoute();
      console.log('Fetched Route Data:', routeData); // Debugging
      setRoute(routeData);

      // Calculate total route distance
      let totalDist = 0;
      for (let i = 0; i < routeData.length - 1; i++) {
        totalDist += haversineDistance(routeData[i], routeData[i + 1]);
      }
      setTotalDistance(totalDist);
    };

    fetchAndCalculateRoute();
  }, []);
  
  useEffect(() => {
    if (!isPlaying || route.length === 0) return;
  
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < route.length - 1) {
          const nextStep = prevStep + 1;
  
          // Update progress and distance covered
          const coveredDist = route.slice(0, nextStep).reduce((acc, curr, index, arr) => {
            if (index < arr.length - 1) {
              return acc + haversineDistance(arr[index], arr[index + 1]);
            }
            return acc;
          }, 0);
          
          // Set distance covered and progress percentage
          setDistanceCovered(coveredDist);
          setProgress((nextStep / (route.length - 1)) * 100);
  
          return nextStep;
        } else {
          clearInterval(interval); // Stop when the vehicle reaches the end
          return prevStep;
        }
      });
    }, 2000 / speed);
  
    return () => clearInterval(interval);
  }, [isPlaying, route, speed]);
  

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleProgressChange = (newProgress) => {
    setProgress(newProgress);
    console.log(progress)
    setCurrentStep(Math.floor((newProgress / 100) * route.length));
  };
  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setDistanceCovered(0);
  };
  const handleSpeedChange = (newSpeed) => setSpeed(newSpeed);

  const coveredRoute = route.slice(0, currentStep + 1); // The portion of the route that has been covered
  const remainingRoute = route.slice(currentStep); // The portion of the route yet to be covered

  return (
    <div>
      <MapContainer center={[17.385044, 78.486671]} zoom={15} style={{ height: "90vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Markers */}
        <SourceMarker position={route[0]} />
        <DestinationMarker position={route[route.length - 1]} />
        <VehicleMarker
          position={route[currentStep] ? route[currentStep] : [0, 0]}  // Ensure it doesn't try to access undefined data
          route={route}
          currentStep={currentStep}
          setBearing={setBearing}
          bearing={bearing}
        />


        {/* Polylines */}
        {coveredRoute.length > 1 && (
          <Polyline positions={coveredRoute} color="blue" weight={4} opacity={0.7} />
        )}
        {remainingRoute.length > 1 && (
          <Polyline positions={remainingRoute} color="red" weight={4} opacity={0.5} />
        )}
      </MapContainer>

      {/* Control Panel */}
      <ControlPanel
        isPlaying={isPlaying}
        progress={progress}
        speed={speed}
        totalDistance={totalDistance}
        distanceCovered={distanceCovered}
        onPlayPause={handlePlayPause}
        onProgressChange={handleProgressChange}
        onReset={handleReset}
        onSpeedChange={handleSpeedChange}
      />
    </div>
  );
};

export default App;
