import { Box, Flex, Grid } from "@chakra-ui/react";
import Map from "../components/Map";
import PropertyTab from "../components/PropertyTab";
import SelectComponent from "../components/SelectComponent";
import { property } from "../data";
import Head from "next/head";

export default function SearchPage() {
  return (
    <Flex px={["2rem", "2.5rem", "2.5rem", "3rem"]} direction="column">
      <Head>
        <title>Search Property</title>
      </Head>
      <SelectComponent />
      <Flex justify="space-between">
        <Box
          h="80vh"
          overflow="auto"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Grid rowGap={4} columnGap={8} templateColumns="repeat(2, 1fr)">
            <PropertyTab property={property} />
            <PropertyTab property={property} />
            <PropertyTab property={property} />
            <PropertyTab property={property} />
            <PropertyTab property={property} />
            <PropertyTab property={property} />
          </Grid>
        </Box>

        {/* <Map /> */}
        <Box w="46%" h="80vh" bg="red.200">
          Map
        </Box>
      </Flex>
    </Flex>
  );
}
