import { properties } from "../../data"
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import Head from "next/head"

export default function Property({ property }) {
  return (
    <Flex px={["2rem", "2.5rem", "2.5rem", "3rem"]} direction="column" pt={5}>
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
            {property.images.map((image, key) => (
              <Image key={key} src={image} alt={`${property.title} images`} />
            ))}
          </Carousel>
        </Box>
        <Flex
          w={["100%", "100%", "90%", "40%"]}
          direction="column"
          h="90vh"
          gap={2}
          overflowY={"auto"}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box>
            <HStack alignItems="flex-end" gap={1}>
              {property.priceType === "lumpsum" ? (
                <Text fontWeight="bold" fontSize="4xl">
                  ₹{property.price}
                </Text>
              ) : (
                <Text fontWeight="bold" fontSize="4xl">
                  EMI starts with ₹{property.price}/month
                </Text>
              )}
              <Text fontWeight="bold" fontSize="lg" paddingBottom={1}>
                {property.area} {property.areaType}
              </Text>
            </HStack>
            <Text fontSize="lg">{property.address}</Text>
          </Box>
          <Flex gap={3} my={1}>
            <Button w="full" colorScheme="teal">
              Contact Agent
            </Button>
            <Button
              disabled={property.videoLink.length === 0}
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
          <Box>
            Ea fugiat veniam officia exercitation commodo do sint pariatur anim
            ullamco irure labore Lorem laboris. Nisi id ex amet excepteur sint
            occaecat pariatur tempor est pariatur amet. Fugiat magna non culpa
            quis. Ad veniam pariatur enim eiusmod elit ut. Proident dolore id
            consequat eiusmod ullamco esse sint nostrud exercitation anim
            deserunt culpa incididunt amet. Velit eiusmod nostrud ad in
            reprehenderit consectetur ut qui ad nulla ipsum deserunt nisi.
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const property = properties.filter(
    (property) => property.propertyId.toString() === params.id
  )

  // Pass post data to the page via props
  return { props: { property: property[0] } }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = properties.map((property) => ({
    params: { id: property.propertyId.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
