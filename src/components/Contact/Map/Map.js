// src/Map.js
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Replace 'your_mapbox_token' with your Mapbox access token
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY_MAPBOX;
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Select the map style
      center: [-75.4823, 40.5677], // Center the map on Allentown, PA
      zoom: 12 // Set an appropriate zoom level
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker at the center
    new mapboxgl.Marker()
      .setLngLat([-75.4823, 40.5677])
      .addTo(map);

    return () => map.remove(); // Clean up on unmount
  }, []);

  return <div className="w-full h-[400px]" ref={mapContainerRef} />;
};

export default Map;
