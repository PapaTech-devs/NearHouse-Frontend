import {
  GoogleMap,
  StandaloneSearchBox,
  MarkerF,
} from "@react-google-maps/api";
import React, { useEffect } from "react";

const mapContainerStyle = {
  height: "63vh",
  width: "100%",
};

function MapWithSearchBox() {
  const [searchBox, setSearchBox] = React.useState(null);
  const zoom = 13;
  const [center, setCenter] = React.useState({
    lat: 22.9867569,
    lng: 87.8549755,
  });

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const success = (pos) => {
    setCenter({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, () => console.error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  const onPlacesChanged = () => {
    const value = searchBox.getPlaces()[0];
    setCenter({
      lat: value.geometry.location.lat(),
      lng: value.geometry.location.lng(),
    });
  };

  const handleClick = (e) => {
    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setCenter(location);
  };

  return (
    <GoogleMap
      id="searchbox-example"
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      options={{ streetViewControl: false }}
      center={center}
      onClick={handleClick}
    >
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Search places"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `280px`,
            height: `45px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `18px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            right: "-130px",
            top: "85px",
            transform: "translate(-50%,-50%)",
          }}
        />
      </StandaloneSearchBox>
      <MarkerF position={center} />
    </GoogleMap>
  );
}

export default React.memo(MapWithSearchBox);
