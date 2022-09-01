import { LoadScript, GoogleMap } from "@react-google-maps/api";
import React from "react";

function Map({ width }) {
  const mapContainerStyle = {
    height: "80vh",
    borderRadius: "5px",
  };

  const [center, setCenter] = React.useState({
    lat: 22.9868,
    lng: 87.855,
  });

  mapContainerStyle.width = width;

  const GoogleMapComponent = (
    <GoogleMap
      id="searchbox-example"
      mapContainerStyle={mapContainerStyle}
      zoom={10}
      options={{ streetViewControl: false }}
      center={center}
    ></GoogleMap>
  );

  if (window.google === undefined)
    return (
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        {GoogleMapComponent}
      </LoadScript>
    );
  else return GoogleMapComponent;
}

export default React.memo(Map);
