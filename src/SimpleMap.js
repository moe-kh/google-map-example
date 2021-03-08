import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  InfoWindow,
} from "@react-google-maps/api";
import TextField from "@material-ui/core/TextField";

import "./App.css";

const containerStyle = {
  width: "700px",
  height: "700px",
};

const center = {
  lat: 50.064192,
  lng: -130.605469,
};

function MyComponent(props) {
  const [text1HasWarning, setText1HasWarning] = useState(false);

  const _text3HasWarning = false;
  const [autocomplete, setAutocomplete] = useState();
  // const classes = useStyles();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD5jTwZ8f0l4csF2UU3mBieyR8SCYFehFs",
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);
  function onLoadd(autocomplete) {
    setAutocomplete(autocomplete);

    autocomplete.bindTo("bounds", map);
  }

  function onPlaceChanged() {
    if (autocomplete !== null) {
      autocomplete.setComponentRestrictions({
        country: ["ca"],
      });
      const place = autocomplete.getPlace();
      console.log(place);
      const google = window.google;
      const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
      });
      console.log(autocomplete.getPlace());
      if (place.formatted_address != undefined) {
        const split_str = place.formatted_address.split(",");
        console.log(split_str.length);
        if (
          !place.geometry ||
          !place.geometry.location ||
          split_str.length !== 4
        ) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          // window.alert("Not complete address for input: '" + place.name + "'");
          setText1HasWarning(true);
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);

          map.setZoom(17);
        }
        setText1HasWarning(false);
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
      } else {
        setText1HasWarning(true);
        console.log("Autocomplete is not loaded yet!");
      }
    } else {
      setText1HasWarning(true);
    }
  }
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const { classes } = props;
  return isLoaded ? (
    <GoogleMap
      id="map"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {" "}
      <Autocomplete
        onLoad={(autocomplete) => onLoadd(autocomplete)}
        onPlaceChanged={() => onPlaceChanged()}
      >
        {/* <input
          type="text"
          placeholder="Search for Location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
          }}
        /> */}
        <TextField
          // className={text1HasWarning ? classes.warningStyles : null}
          style={{
            width: `400px`,
            borderRadius: `3px`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
            marginTop: "10px",
            backgroundColor: "#fff",
          }}
          id="outlined-search"
          label="Enter Location"
          type="search"
          variant="outlined"
          helperText="must be a complete address"
          error={text1HasWarning}
          // error={!!errors}
          // helperText={errors && "Incorrect entry."}
        />
        {/* <TextField
          style={{
            padding: `0 12px`,
            borderRadius: `3px`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
            marginTop: "20px",
          }}
          className="searchField"
          id="outlined-helperText"
          label="Search..."
          helperText="must be a complete address"
          variant="outlined"
        /> */}
      </Autocomplete>
    </GoogleMap>
  ) : null;
}

export default MyComponent;
