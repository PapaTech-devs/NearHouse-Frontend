import { Box, Text } from "@chakra-ui/react"
import {
  LoadScript,
  GoogleMap,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { usePropertyContext } from "../hooks/propertyContext"

function Map({ width, properties }) {
  const { selectedProperty, setSelectedProperty } = usePropertyContext()
  const [map, setMap] = React.useState(null)
  const router = useRouter()
  const center = {
    lat: 24.506333431042226,
    lng: 88.00143583489339,
  }

  useEffect(() => {
    if (map && properties.length > 0) {
      var bounds = new window.google.maps.LatLngBounds()
      for (var i = 0; i < properties.length; i++) {
        bounds.extend(
          new window.google.maps.LatLng(
            parseFloat(properties[i].location.lat),
            parseFloat(properties[i].location.lng)
          )
        )
      }
      map.fitBounds(bounds)
    }
  }, [map, properties])

  const mapContainerStyle = {
    height: "80vh",
    borderRadius: "5px",
  }

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(_) {
    setMap(null)
  }, [])

  mapContainerStyle.width = width

  const GoogleMapComponent = (
    <GoogleMap
      id="searchbox-example"
      mapContainerStyle={mapContainerStyle}
      onLoad={onLoad}
      zoom={6}
      onUnmount={onUnmount}
      options={{ streetViewControl: false }}
      center={properties.length === 0 ? center : null}
    >
      {properties.map((property) => (
        <MarkerF
          onMouseDown={() => setSelectedProperty(property.propertyid)}
          onMouseOver={() => setSelectedProperty(property.propertyid)}
          onMouseUp={() => setSelectedProperty(null)}
          onMouseOut={() => setSelectedProperty(null)}
          onClick={() => router.push(`/property/${property.propertyid}`)}
          key={property.propertyid}
          position={{
            lat: parseFloat(property.location.lat),
            lng: parseFloat(property.location.lng),
          }}
        >
          {selectedProperty === property.propertyid && (
            <InfoWindowF
              position={{
                lat: parseFloat(property.location.lat),
                lng: parseFloat(property.location.lng),
              }}
            >
              <Box w="125px" color="black">
                <Text>
                  {property.title.length > 15
                    ? property.title.split("").splice(15).join("") + ".."
                    : property.title}
                </Text>
                <Text fontWeight="bold" marginTop="8px">
                  ₹{property.price}{" "}
                  {property.priceType !== "lumpsum" && "/month"}
                </Text>
              </Box>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  )

  if (window.google === undefined)
    return (
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        libraries={["places"]}
      >
        {GoogleMapComponent}
      </LoadScript>
    )
  else return GoogleMapComponent
}

export default React.memo(Map)
