import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import React from "react";

const mapContainerStyle = {
  height: "80vh",
  width: "46%",
};

function Map() {
  const [searchBox, setSearchBox] = React.useState(null);
  const [center, setCenter] = React.useState({
    lat: 22.9868,
    lng: 87.855,
  });

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const value = searchBox.getPlaces()[0];
    console.log(value.geometry.location.lat());
    setCenter({
      lat: value.geometry.location.lat(),
      lng: value.geometry.location.lng(),
    });
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        <GoogleMap
          id="searchbox-example"
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          options={{ streetViewControl: false }}
          center={center}
        >
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
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
                right: "-20px",
                top: "5%",
                transform: "translate(-50%,-50%)",
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(Map);
