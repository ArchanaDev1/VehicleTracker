import React from 'react';

const ControlPanel = ({
  isPlaying,
  progress,
  speed,
  totalDistance,
  distanceCovered,
  onPlayPause,
  onProgressChange,
  onReset,
  onSpeedChange,
}) => {
  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
     

      {/* Progress Range */}
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => onProgressChange(e.target.value)}
        style={{ width: '40%' }}
      />
       {/* Play/Pause Button */}
       <button onClick={onPlayPause} style={{ padding: '10px 20px', fontSize: '16px' }}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* Reset Button */}
      <button onClick={onReset} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Reset
      </button>

      {/* Speed Slider */}
      <input
        type="range"
        min="1"
        max="5"
        value={speed}
        onChange={(e) => onSpeedChange(e.target.value)}
        style={{ width: '20%' }}
      />

      {/* Distance Info */}
      <div>
        Distance Covered: {distanceCovered.toFixed(2)} km / {totalDistance.toFixed(2)} km
      </div>
    </div>
  );
};

export default ControlPanel;
