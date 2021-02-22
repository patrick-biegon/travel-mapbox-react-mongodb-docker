import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import {listLogEntries} from './api';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 21.1458,
    longitude: 79.0882,
    zoom: 3
  });

useEffect(() => {
  (async () => {
    const logEntries = await listLogEntries();
    console.log(logEntries);

  })();

}, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/asgaraliq/cklfm0y8e3zkx17o0la6s1hk6"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}

export default App;