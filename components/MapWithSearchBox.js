import { GoogleMap, StandaloneSearchBox, MarkerF } from "@react-google-maps/api"
import React, { useEffect } from "react"

const mapContainerStyle = {
  height: "63vh",
  width: "100%",
}

function MapWithSearchBox({ values, setValues }) {
  const [searchBox, setSearchBox] = React.useState(null)
  const zoom = 17
  const [center, setCenter] = React.useState({
    lat: 22.9867569,
    lng: 87.8549755,
  })
  const [marker, setMarker] = React.useState(null)

  const onLoad = (ref) => {
    setSearchBox(ref)
  }

  const success = (pos) => {
    const position = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    }
    setCenter(position)
    setMarker(position)
    setValues({
      ...values,
      location: position,
    })
  }

  useEffect(() => {
    if (!values.location)
      navigator.geolocation.getCurrentPosition(success, () => console.error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      })
    else {
      setCenter({
        lat: parseFloat(values.location.lat),
        lng: parseFloat(values.location.lng),
      })
      setMarker({
        lat: parseFloat(values.location.lat),
        lng: parseFloat(values.location.lng),
      })
    }
  }, [])

  const onPlacesChanged = () => {
    if (!searchBox) {
      alert("Clear input and search again")
      return
    }
    const value = searchBox.getPlaces()[0]
    setCenter({
      lat: value.geometry.location.lat(),
      lng: value.geometry.location.lng(),
    })
  }

  const handleClick = (e) => {
    const location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    setValues({
      ...values,
      location: location,
    })
    setMarker(location)
  }

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
      {marker && <MarkerF position={marker} />}
    </GoogleMap>
  )
}

export default React.memo(MapWithSearchBox)
