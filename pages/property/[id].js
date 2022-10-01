import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import Head from "next/head"

export default function Property({ property }) {
  function firstLetterCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  const facingList = {
    north: "North",
    south: "South",
    east: "East",
    west: "West",
    northwest: "North West",
    northeast: "North East",
    southeast: "South East",
    southwest: "South West",
  }
  const statusList = {
    underconstruction: "Under Construction",
    readytomove: "Ready To Move",
  }
  const furnishedType = {
    fullfurnished: "Full Furnished",
    semifurnished: "Semi Furnished",
    unfurnished: "Unfurnished",
  }
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  })

  return (
    <Flex px={["1.5rem", "2.5rem", "2.5rem", "3rem"]} direction="column" pt={5}>
      <Head>
        <title>{property.title}</title>
      </Head>
      <Flex
        justifyContent="space-between"
        w="100%"
        direction={["column", "column", "row", "row"]}
        gap={5}
      >
        <Box w={["100%", "100%", "90%", "65%"]}>
          <Carousel
            swipeable={true}
            emulateTouch={true}
            autoPlay
            className="carousel"
            dynamicHeight
            labels={false}
            showThumbs={false}
            showStatus={false}
          >
            {property.images.length !== 0 ? (
              property.images.map((image, key) => (
                <Image
                  maxH="85vh"
                  objectFit="contain"
                  key={key}
                  src={image}
                  alt={`${property.title} images`}
                />
              ))
            ) : (
              <Image
                maxH="85vh"
                objectFit="contain"
                key={"dummy image"}
                src={"/images/dummy.png"}
                alt={`Dummy property images`}
              />
            )}
          </Carousel>
        </Box>
        <Flex
          w={["100%", "100%", "90%", "40%"]}
          direction="column"
          h={["fit-content", "90vh", "90vh", "90vh"]}
          gap={2}
          pb={4}
          overflowY={"auto"}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box>
            <Flex
              direction={["column", "row", "row", "row"]}
              alignItems={["flex-start", "flex-end", "flex-end", "flex-end"]}
              gap={[0, 0, 0, 4]}
            >
              {property.priceType === "lumpsum" ? (
                <Text fontWeight="bold" fontSize="4xl">
                  {formatter.format(property.price)}
                </Text>
              ) : (
                <Text fontWeight="bold" fontSize="4xl">
                  EMI starts with {formatter.format(property.price)}/month
                </Text>
              )}
              <Flex alignItems="center" gap="2">
                <Text fontWeight="bold" fontSize="2xl">
                  {firstLetterCapital(property.propertyType)}
                </Text>
                <Text fontWeight="bold" fontSize="2xl">
                  {property.area} {firstLetterCapital(property.areaType)}
                </Text>
              </Flex>
            </Flex>
            <Text fontSize="lg">{property.address}</Text>
            {property.verified && (
              <Badge mt="2" colorScheme="green">
                Property verified by NearHouse
              </Badge>
            )}
          </Box>
          <Flex gap={3} my={1}>
            <Button
              onClick={() => {
                window.location.href = "tel:+918918542704"
              }}
              w="full"
            >
              Call Now
            </Button>
            <Button
              disabled={!property.videoLink}
              w="full"
              colorScheme="telegram"
            >
              View Tour
            </Button>
          </Flex>
          <Divider my={2} />
          <Box>
            <Text fontWeight="bold" fontSize="2xl" mb={1}>
              {property.title}
            </Text>
            <Text>{property.description}</Text>
          </Box>
          <Divider my={2} />
          <Text fontSize="xl" fontWeight="bold">
            Property Details
          </Text>
          <Grid
            columnGap={2}
            rowGap={4}
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
          >
            {property.propertyType !== "plot" ? (
              <>
                <Flex
                  justifyContent="space-between"
                  direction={["row", "column", "column", "column"]}
                >
                  <Text>BHK</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {property.bhk}
                  </Text>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  direction={["row", "column", "column", "column"]}
                >
                  <Text>Bathrooms</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {property.numBath}
                  </Text>
                </Flex>
                {property.propertyType === "flat" && (
                  <Flex
                    justifyContent="space-between"
                    direction={["row", "column", "column", "column"]}
                  >
                    <Text>Floor No.</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      {property.floorNo}
                    </Text>
                  </Flex>
                )}
                {property.propertyType === "house" && (
                  <Flex
                    justifyContent="space-between"
                    direction={["row", "column", "column", "column"]}
                  >
                    <Text>Number of floors</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      {property.numFloor}
                    </Text>
                  </Flex>
                )}
                <Flex
                  justifyContent="space-between"
                  direction={["row", "column", "column", "column"]}
                >
                  <Text>Status</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {statusList[property.currentStatus]}
                  </Text>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  direction={["row", "column", "column", "column"]}
                >
                  <Text>Furnished</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {furnishedType[property.furnishType]}
                  </Text>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  direction={["row", "column", "column", "column"]}
                >
                  <Text>Number of balcony</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {property.balcony ?? "No data"}
                  </Text>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  direction={["row", "column", "column", "column"]}
                >
                  <Text>Dependent Parking</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {property.numParkingDependent ?? "No data"}
                  </Text>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  direction={["row", "column", "column", "column"]}
                >
                  <Text>Independent Parking</Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {property.numParkingIndependent ?? "No data"}
                  </Text>
                </Flex>{" "}
              </>
            ) : (
              <Flex
                justifyContent="space-between"
                direction={["row", "column", "column", "column"]}
              >
                <Text>Type of land</Text>
                <Text fontSize="lg" fontWeight="bold">
                  {firstLetterCapital(property.landType)}
                </Text>
              </Flex>
            )}
            <Flex
              justifyContent="space-between"
              direction={["row", "column", "column", "column"]}
            >
              <Text>Facing</Text>
              <Text fontSize="lg" fontWeight="bold">
                {facingList[property.facing]}
              </Text>
            </Flex>
          </Grid>
          <Divider my={2} />
          <Text fontSize="xl" fontWeight="bold">
            Contact Number
          </Text>
          <Text>+91 8918542704</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const properties = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/properties/propertyList`
  ).then((res) => res.json())

  console.log("Get static props", properties)

  const property = properties.filter(
    (property) => property.propertyid === params.id
  )

  // Pass post data to the page via props
  return { props: { property: property[0] } }
}

// This function gets called at build time
export async function getStaticPaths() {
  const properties = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/properties/propertyids`
  ).then((res) => res.json())

  console.log("Get static paths", properties)

  // Get the paths we want to pre-render based on posts
  const paths = properties.map((propertyids) => ({
    params: { id: propertyids },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}
