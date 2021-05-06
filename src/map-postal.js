import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
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

function mapForPostal(props) {
  const [text1HasWarning, setText1HasWarning] = useState(false);
  const [autocomplete, setAutocomplete] = useState();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "GOOGLE_API_KEY",
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(null);
  function onLoadd(autocomplete) {
    console.log();
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
      let reg = new RegExp(
        /^[ -][A-Za-z][A-Za-z][ -][A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
      );

      if (place.formatted_address != undefined) {
        const split_str = place.formatted_address.split(",");
        if (
          !place.geometry ||
          !place.geometry.location ||
          split_str.length !== 3 ||
          !reg.test(split_str[1])
        ) {
          console.log(reg.test(split_str[1]));
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
          label="Enter Postal Code"
          type="search"
          variant="outlined"
          helperText="must be a postal code"
          error={text1HasWarning}
        />
      </Autocomplete>
    </GoogleMap>
  ) : null;
}

export default mapForPostal;
