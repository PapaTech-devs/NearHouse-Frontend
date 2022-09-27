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

  useEffect(() => {
    if (map) {
      var bounds = new window.google.maps.LatLngBounds()
      for (var i = 0; i < properties.length; i++) {
        bounds.extend(
          new window.google.maps.LatLng(
            properties[i].location.lat,
            properties[i].location.lng
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
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ streetViewControl: false }}
    >
      {properties.map((property) => (
        <MarkerF
          onMouseOver={() => setSelectedProperty(property.propertyId)}
          onMouseOut={() => setSelectedProperty(null)}
          onClick={() => router.push(`/property/${property.propertyId}`)}
          key={property.propertyId}
          position={property.location}
        >
          {selectedProperty === property.propertyId && (
            <InfoWindowF position={property.location}>
              <Box w="125px">
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
