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
import { useEffect } from "react"
import { FiMapPin } from "react-icons/fi"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { usePropertyContext } from "../hooks/propertyContext"
import { useAuth } from "../hooks/contextHooks"

export default function SearchPage() {
  const {
    filteredProperties,
    allProperties,
    setRegions,
    loading,
    mobileMapShow,
    setMobileMapShow,
  } = usePropertyContext()
  const { authUser } = useAuth()
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
    <Flex
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      direction="column"
      bgColor="black"
      h="90vh"
      color="white"
      pt={4}
    >
      <Head>
        <title>Search Property</title>
      </Head>
      <SelectComponent />
      {!loading ? (
        <Flex justify="space-between">
          {!mobileMapShow ? (
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
                gap={5}
                pr={[0, 0, 3, 5]}
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                ]}
              >
                {filteredProperties.length === 0 ? (
                  <Text fontWeight="semibold">
                    {allProperties.length === 0
                      ? "Please search for a region"
                      : "No properties found"}
                  </Text>
                ) : (
                  filteredProperties.map((property) => {
                    if (authUser && authUser.role === "admin")
                      return (
                        <PropertyTab
                          key={property.propertyid}
                          property={property}
                          maxWidth="450px"
                          imageHeight="215px"
                          type="edit"
                        />
                      )
                    return (
                      <PropertyTab
                        key={property.propertyid}
                        property={property}
                        maxWidth="450px"
                        imageHeight="215px"
                        type="search"
                      />
                    )
                  })
                )}
                {filteredProperties.length === 1 && (
                  <Box height="215px" width="450px" />
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
            <Map properties={filteredProperties} width="44%" />
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
              onClick={() => setMobileMapShow(!mobileMapShow)}
              rightIcon={
                !mobileMapShow ? (
                  <Icon as={FiMapPin} size={25} mt="1" />
                ) : (
                  <Icon as={AiOutlineUnorderedList} size={25} mt="1" />
                )
              }
            >
              {!mobileMapShow ? "Map View" : "List View"}
            </Button>
          </Hide>
        </Flex>
      ) : (
        <CircularProgress isIndeterminate />
      )}
    </Flex>
  )
}
