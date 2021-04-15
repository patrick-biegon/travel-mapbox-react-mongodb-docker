import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl, GeolocateControl, FlyToInterpolator } from 'react-map-gl';
import { listLogEntries } from './api';
import LogEntryForm from './components/LogEntryForm';
import useDarkMode from 'use-dark-mode';
import Panel from './components/Panel';
import DarkModeToggle from 'react-dark-mode-toggle';
import Navbar from './components/Navbar';

const { Redirect } = require("react-router-dom");

const API_URL = process.env.REACT_APP_API_URL;

const geolocateControlStyle = {
  left: 22,
  top: 180
};

const light = {
  mapStyle: "mapbox://styles/asgaraliq/ckncbvvw610bw17nrs1mbcnwg",
}

const dark = {
  mapStyle: "mapbox://styles/asgaraliq/ckmnku33lhbpj17qywwoo0qrd",
}

const getTheme = (mode) => {
  //console.log(mode);
  return {
    colors: mode === light ? light : dark,
  }
}

const log = (theme) => {
  console.log(theme);
}

const themeTime = () => {
  let s = new Date().toLocaleString();
  console.log(s);
  return s < "18:00:00" ? true : false;
}

const App = () => {

  const [logEntries, setLogEntries] = useState([]);
  const [togglePopup] = React.useState(false);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [weatherDetail, setWeatherDetail] = useState("Fetching...");
  const [TempDetail, setTempDetail] = useState("Fetching...");
  const [RainDetail, setRainDetail] = useState("Fetching...");
  const [showPopup, setShowPopup] = useState({});
  const [selectedTags, setSelectedTags] = useState("Home");
  const darkMode = useDarkMode(false);
  const theme = getTheme(darkMode.value ? dark : light);


  const [settings, setSettings] = useState({
    doubleClickZoom: false,
  });

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 21.1458,
    longitude: 79.0882,
    zoom: 3,
  });

  const onSelectEntries = useCallback(({ longitude, latitude }) => {
    setViewport({
      longitude,
      latitude,
      isDragging: false,
      isPanning: false,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: 'auto'
    });
  }, []);



  const getEntries = async () => {
    const logEntries = await listLogEntries();
    //  console.log(logEntries);
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);



  if (!localStorage.getItem("token")) {
    // Action you want to perform if not logged in.
    return <Redirect to="/" />;
  }



  const updateWeatherDetails = (latitude, longitude) => {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/logs/getlocation`, {
      method: "POST",
      body: JSON.stringify({
        "lat": latitude,
        "lon": longitude
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
      .then(data => {
        setWeatherDetail(data.Summary)
        setTempDetail(data.temperature)
        setRainDetail(data.rain)
      })
      .catch(() => setWeatherDetail("Error Fetching Weather Info"))
  }

  const showAddMarkerPop = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (

    <ReactMapGL
      {...viewport}
      {...settings}

      mapStyle={theme.colors.mapStyle}
      //  {...log(theme)}
      //{...log(themeTime())}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPop}
      dragRotate={true}


    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker

              latitude={entry.latitude}
              longitude={entry.longitude}
            //  offsetLeft={-12} 
            //  offsetTop={-24}
            >
              <div onClick={() => {
                updateWeatherDetails(entry.latitude, entry.longitude)
                setShowPopup({
                  //...showPopup,
                  [entry._id]: true,
                })
              }}>
                <svg
                  className="marker yellow"
                  style={{
                    height: `${3 * viewport.zoom}px`,
                    width: `${3 * viewport.zoom}px`,
                  }}
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 511.999 511.999">
                  <g>
                    <g>
                      <path d="M255.999,0C152.786,0,68.817,85.478,68.817,190.545c0,58.77,29.724,130.103,88.349,212.017
                      c42.902,59.948,85.178,102.702,86.957,104.494c3.27,3.292,7.572,4.943,11.879,4.943c4.182,0,8.367-1.558,11.611-4.683
                      c1.783-1.717,44.166-42.74,87.149-101.86c58.672-80.701,88.421-153.007,88.421-214.912C443.181,85.478,359.21,0,255.999,0z
                      M255.999,272.806c-50.46,0-91.511-41.052-91.511-91.511s41.052-91.511,91.511-91.511s91.511,41.052,91.511,91.511
                      S306.457,272.806,255.999,272.806z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>

            {

              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => {
                    setShowPopup({})
                    setWeatherDetail("Fetching...")
                  }}
                  on
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>

                    {entry.image && <img src={entry.image} alt={entry.title} />}

                    <p>{entry.tags}</p>
                    <div className="weather">
                      {weatherDetail}
                      <br>
                      {TempDetail}
                      </br>
                      {RainDetail}
                    </div>


                  </div>
                </Popup>
              ) : null
            }

          </React.Fragment>
        ))
      }

      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            //  offsetLeft={-12} 
            //  offsetTop={-24}
            >
              <div>
                <svg
                  className="marker red"
                  style={{
                    height: `${3 * viewport.zoom}px`,
                    width: `${3 * viewport.zoom}px`,
                  }}
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 511.999 511.999">
                  <g>
                    <g>
                      <path d="M255.999,0C152.786,0,68.817,85.478,68.817,190.545c0,58.77,29.724,130.103,88.349,212.017
                      c42.902,59.948,85.178,102.702,86.957,104.494c3.27,3.292,7.572,4.943,11.879,4.943c4.182,0,8.367-1.558,11.611-4.683
                      c1.783-1.717,44.166-42.74,87.149-101.86c58.672-80.701,88.421-153.007,88.421-214.912C443.181,85.478,359.21,0,255.999,0z
                      M255.999,272.806c-50.46,0-91.511-41.052-91.511-91.511s41.052-91.511,91.511-91.511s91.511,41.052,91.511,91.511
                      S306.457,272.806,255.999,272.806z"/>
                    </g>
                  </g>
                </svg>
              </div>

            </Marker>

            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className="popup">
                <LogEntryForm
                  onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation} />
              </div>
            </Popup>
          </>
        ) : null
      }



      <div className="nav" >
        <NavigationControl />
      </div>


      <div className="geo" >
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
      </div>

      {
        <div className="panel">
          <h4><center>Log Entries</center></h4>

          <div key={`btn-${logEntries._id}`} >
            <select
              className="dropdown"
              onChange={(e) => {
                const selectedTag = e.target.value;
                setSelectedTags(selectedTag);
              }}
              id={`entry-${logEntries._id}`}
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="College">College</option>
              <option value="Hospital">Hospital</option>
              <option value="Food">Food</option>
              <option value="Monument">Monument</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>

          </div>
          <div className="panelItem">

            {
              // const filterdEntry = logEntries.filter(logEntries => logEntries.tags == {selectedTag});
              // console.log(filterdEntry);
              logEntries.filter(item => item.tags === selectedTags).map(filterdEntry => (
                //      console.log(selectedTags),
                <React.Fragment key={filterdEntry._id}>
                  <div key={`btn-${filterdEntry._id}`} className="input">
                    <input
                      type="button"
                      name="entries"
                      className="inputButton"
                      id={`entry-${filterdEntry._id}`}
                      onClick={() => onSelectEntries(filterdEntry)}
                      value={filterdEntry.title}
                    />
                  </div>
                </React.Fragment>
              ))
            }
          </div>
        </div>

      }
      {/* <Panel */}
      {/* onSelectEntries={onSelectEntries} */}
      {/* /> */}

      <div className="themeToggle">
        <DarkModeToggle
          onChange={darkMode.toggle}
          checked={darkMode.value}
          className={"themeButton"}
          size={50}
          speed={2.5}
        />
      </div>

      <div className="NavbarApp">
        <Navbar />
      </div>


    </ReactMapGL>





  );
}

export default App;