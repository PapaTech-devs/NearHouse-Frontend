import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  IconButton,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import Head from "next/head"
import { AiFillPhone, AiOutlineWhatsApp, AiFillSchedule } from "react-icons/ai"
import PropertyAppointmentModal from "../../components/PropertyAppointmentModal"
import { useState } from "react"
import { useAuth } from "../../hooks/contextHooks"
import { showToast } from "../../utils"

export default function Property({ property }) {
  const [values, setValues] = useState({
    userName: "",
    userEmail: "",
    userMobileNo: "",
    appointmentDate: "",
  })
  const toast = useToast()
  const { authUser } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
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
    maximumFractionDigits: 2,
  })

  return (
    <Flex
      h="90vh"
      bgColor="black"
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      direction="column"
      pt={5}
      color="white"
    >
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
              gap={4}
            >
              {property.priceType === "lumpsum" ? (
                <Text fontWeight="bold" fontSize="4xl">
                  {formatter.format(property.price / 1e5)} Lacs
                </Text>
              ) : (
                <Text fontWeight="bold" fontSize="4xl">
                  EMI starts with {formatter.format(property.price)}/month
                </Text>
              )}
              <Flex alignItems="center" gap="2">
                <Box w={1} h={6} border="1px" bgColor="white" />
                <Text fontWeight="bold" fontSize="2xl" px={1}>
                  {firstLetterCapital(property.propertyType)}
                </Text>
                <Box w={1} h={6} border="1px" bgColor="white" />
                <Text fontWeight="bold" fontSize="2xl" px={1}>
                  {property.area} {firstLetterCapital(property.areaType)}
                </Text>
              </Flex>
            </Flex>
            <Text my={2} fontSize="lg" color="white">
              {property.address}
            </Text>
            {property.verified && (
              <Badge mt="2" colorScheme="green">
                Property verified by NearHouse
              </Badge>
            )}
          </Box>
          <Flex gap={3} mt={1}>
            <IconButton
              icon={<AiFillPhone size="20" />}
              color="black"
              colorScheme="facebook"
              onClick={() => {
                window.location.href = "tel:+918918542704"
              }}
              w="full"
            />
            <IconButton
              icon={<AiOutlineWhatsApp size={20} />}
              color="black"
              colorScheme="whatsapp"
              onClick={() => {
                window.location.href = "https://wa.me/8918542704"
              }}
              w="full"
            />
            <IconButton
              icon={<AiFillSchedule size="20" />}
              colorScheme="twitter"
              color="black"
              onClick={() => {
                if (authUser) onOpen()
                else
                  showToast("Please login to fix appointment.", "error", toast)
              }}
              w="full"
            />
            <Button
              disabled={!property.videoLink}
              w="full"
              color="black"
              colorScheme="telegram"
              onClick={() => {
                window.location.href = property.videoLink ?? ""
              }}
            >
              View Tour
            </Button>
            <PropertyAppointmentModal
              values={values}
              setValues={setValues}
              isOpen={isOpen}
              onClose={onClose}
              propertyid={property.propertyid}
            />
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
                    {property.furnishType
                      ? furnishedType[property.furnishType]
                      : "No Data"}
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
                </Flex>
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

  const property = properties.filter(
    (property) => property.propertyid === params.id
  )

  // Pass post data to the page via props
  return { props: { property: property[0] }, revalidate: 10 }
}

// This function gets called at build time
export async function getStaticPaths() {
  const properties = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/properties/propertyids`
  ).then((res) => res.json())

  // Get the paths we want to pre-render based on posts
  const paths = properties.map((propertyids) => ({
    params: { id: propertyids },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}
