import { Box, Button, Flex, Grid, Hide, Show, Icon } from "@chakra-ui/react";
import Map from "../components/Map";
import PropertyTab from "../components/PropertyTab";
import SelectComponent from "../components/SelectComponent";
import { property } from "../data";
import Head from "next/head";
import { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";

export default function SearchPage() {
  const [showMap, setShowMap] = useState(false);
  return (
    <Flex px={["2rem", "2.5rem", "2.5rem", "3rem"]} direction="column">
      <Head>
        <title>Search Property</title>
      </Head>
      <SelectComponent />
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
              <PropertyTab property={property} />
              <PropertyTab property={property} />
              <PropertyTab property={property} />
              <PropertyTab property={property} />
              <PropertyTab property={property} />
              <PropertyTab property={property} />
            </Grid>
          </Box>
        ) : (
          // <Box w="100%" h="80vh" bg="red.200" borderRadius="5px">
          //   Map
          // </Box>
          <Map width="100%" />
        )}

        <Show above="md">
          {/* <Box w="46%" h="80vh" bg="red.200" borderRadius="5px">
            Map
          </Box> */}
          <Map width="46%" />
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
    </Flex>
  );
}
