import React from 'react';

const ActivityMarker = ({ e, timeScale, y, className }) => {
  const startX = timeScale(e.startTimeMillis);
  const eventMarkerHeight = 20;
  const endX = timeScale(e.endTimeMillis);
  const width = endX - startX;

  if (e.isPermit) {
    return (
      <rect
        x={startX}
        y={y - eventMarkerHeight / 2}
        width={width}
        height={eventMarkerHeight}
        className={className}
        fill={e.color}
      />
    );
  }

  if (e.endTimeMillis === undefined) {
    return (
      <svg>
        <circle
          cx={startX}
          cy={y}
          r={eventMarkerHeight / 2}
          className={className}
          fill={e.color}
        />
      </svg>
    );
  }

  if (e.isEntryExit) {
    return (
      <rect
        x={startX}
        y={y - 10 / 2}
        width={width}
        height={10}
        className={className}
        fill={e.color}
      />
    );
  }

  return (
    <rect
      x={startX}
      y={y - eventMarkerHeight / 2}
      width={width}
      height={eventMarkerHeight}
      className={className}
      fill={e.color}
    />
  );
};

export default ActivityMarker;
