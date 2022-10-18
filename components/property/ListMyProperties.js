import { Grid, Text } from "@chakra-ui/react"
import { usePropertyContext } from "../../hooks/propertyContext"
import PropertyTab from "../PropertyTab"

export default function ListMyProperties({ setAdd, setEditingProperty }) {
  const { myProperties, loading } = usePropertyContext()
  if (loading) return <>Fetching properties...</>
  return (
    <Grid
      rowGap={4}
      columnGap={8}
      justifyContent="center"
      color="white"
      pb={4}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
    >
      {myProperties.length === 0 ? (
        <Text>No properties to be displayed</Text>
      ) : (
        myProperties.map((property) => (
          <PropertyTab
            maxWidth="460px"
            key={property.propertyid}
            property={property}
            imageHeight="250px"
            type="edit"
            editProperty={() => {
              setEditingProperty(property)
              setAdd(true)
            }}
          />
        ))
      )}
    </Grid>
  )
}
