import {
  Box,
  Button,
  Flex,
  Grid,
  Hide,
  Show,
  Icon,
  CircularProgress,
  Text,
} from "@chakra-ui/react"
import Map from "../components/Map"
import PropertyTab from "../components/PropertyTab"
import SelectComponent from "../components/SelectComponent"
import Head from "next/head"
import { useState, useEffect } from "react"
import { FiMapPin } from "react-icons/fi"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { usePropertyContext } from "../hooks/propertyContext"

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false)
  const { filteredProperties, allProperties, setRegions, loading } =
    usePropertyContext()

  useEffect(() => {
    async function fetchRegions() {
      try {
        const res = await fetch("/backend/regions")
        const data = await res.json()
        setRegions(data)
      } catch (err) {
        console.error(err)
        alert(err.toString())
      }
    }
    fetchRegions()
  }, [])

  return (
    <Flex px={["2rem", "2.5rem", "2.5rem", "3rem"]} direction="column">
      <Head>
        <title>Search Property</title>
      </Head>
      <SelectComponent />
      {!loading ? (
        <Flex justify="space-between">
          {!showMap ? (
            <Box
              h="80vh"
              overflow="auto"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Grid
                rowGap={4}
                columnGap={8}
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                ]}
              >
                {filteredProperties.length === 0 ? (
                  <Text fontSize="lg" fontWeight="bold">
                    {allProperties.length === 0
                      ? "Please search for a region"
                      : "No properties found"}
                  </Text>
                ) : (
                  filteredProperties.map((property) => (
                    <PropertyTab
                      key={property.propertyid}
                      property={property}
                      maxWidth="450px"
                      imageHeight="215px"
                      type="search"
                    />
                  ))
                )}
              </Grid>
            </Box>
          ) : (
            // <Box w="100%" h="80vh" bg="red.200" borderRadius="5px">
            //   Map
            // </Box>
            <Map properties={filteredProperties} width="100%" />
          )}

          <Show above="md">
            {/* <Box w="46%" h="80vh" bg="red.200" borderRadius="5px">
            Map
          </Box> */}
            <Map properties={filteredProperties} width="48%" />
          </Show>
          <Hide above="md">
            <Button
              size="lg"
              position="absolute"
              colorScheme="teal"
              bottom="75px"
              left="50%"
              transform="translate(-50%,-50%)"
              fontSize="xl"
              onClick={() => setShowMap(!showMap)}
              rightIcon={
                !showMap ? (
                  <Icon as={FiMapPin} size={25} mt="1" />
                ) : (
                  <Icon as={AiOutlineUnorderedList} size={25} mt="1" />
                )
              }
            >
              {!showMap ? "Map View" : "List View"}
            </Button>
          </Hide>
        </Flex>
      ) : (
        <CircularProgress isIndeterminate />
      )}
    </Flex>
  )
}
