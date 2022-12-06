import {
  Button,
  Flex,
  Grid,
  Image,
  Text,
  Square,
  Box,
  Icon,
  useToast,
} from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { MdPhoneCallback } from "react-icons/md"
import { GrAddCircle } from "react-icons/gr"
import PropertyTab from "../components/PropertyTab"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/contextHooks"
import { showToast } from "../utils/index"

export default function HomePage() {
  const [featuredHouse, setFeaturedHouse] = useState(null)
  const [featuredFlats, setFeaturedFlats] = useState(null)
  const [featuredPlots, setFeaturedPlots] = useState(null)
  const [featuredCommercial, setFeaturedCommercial] = useState(null)
  const router = useRouter()
  const { authUser } = useAuth()
  const toast = useToast()

  useEffect(() => {
    async function fetchProperty() {
      const res = await fetch("/backend/properties/featured")
      const data = await res.json()
      setFeaturedHouse(
        data
          .filter((property) => property.propertyType === "house")
          .splice(0, 6)
      )
      setFeaturedFlats(
        data.filter((property) => property.propertyType === "flat").splice(0, 6)
      )
      setFeaturedPlots(
        data.filter((property) => property.propertyType === "land").splice(0, 6)
      )
      setFeaturedCommercial(
        data
          .filter((property) => property.propertyType === "commercial")
          .splice(0, 6)
      )
    }

    fetchProperty()
  }, [])

  return (
    <Flex
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      direction="column"
      bgColor="black"
      h="90vh"
      color="white"
    >
      <Head>
        <title>Nearhouse</title>
      </Head>
      <Button
        leftIcon={<BsSearch />}
        py="4"
        mt={4}
        bgColor="white"
        color="black"
        fontSize={["xl", "lg", "lg", "lg"]}
        fontWeight="bold"
        textAlign="left"
        h={["10vh", "10vh", "10vh", "6vh"]}
      >
        Search properties near you
      </Button>
      <Grid
        py={[10, 10, 10, 20]}
        gap={3}
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(6, 1fr)",
          "repeat(6, 1fr)",
        ]}
      >
        <Square border="1px" borderColor="#4FE44C" borderRadius="sm">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/house_icon.png" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              House
            </Text>
          </Flex>
        </Square>
        <Square border="1px" borderColor="#4FE44C" borderRadius="sm">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/flat_icon.png" alt="flats icon" />
            <Text fontSize="2xl" fontWeight="bold">
              Flats
            </Text>
          </Flex>
        </Square>
        <Square border="1px" borderColor="#4FE44C" borderRadius="sm">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/plot_icon.png" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              Plots
            </Text>
          </Flex>
        </Square>
        <Square border="1px" borderColor="#4FE44C" borderRadius="sm">
          <Flex
            py={["5", "5", "5", "8"]}
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            gap={3}
          >
            <Image w="55%" src="/images/services_icon.png" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              Services
            </Text>
          </Flex>
        </Square>
        <Square border="1px" borderColor="#4FE44C" borderRadius="sm">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/commercial_icon.png" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              Commercial
            </Text>
          </Flex>
        </Square>
        <Square border="1px" borderColor="#4FE44C" borderRadius="sm">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/blog_icon.png" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              Blogs
            </Text>
          </Flex>
        </Square>
      </Grid>
      <Box
        border="4px"
        borderColor="#4FE44C"
        textAlign="center"
        p={6}
        position="relative"
      >
        {/* <Image
          h={10}
          w={10}
          position="absolute"
          right="-5"
          top="-5"
          src="/images/sparkle.png"
          alt="sparle image"
        /> */}
        <Text fontSize="3xl" fontWeight="bold">
          List Properties for free and Get Unlimited Leads
        </Text>
      </Box>

      <Flex justifyContent="space-between" mt={12}>
        <Button
          bgColor="#4FE44C"
          color="black"
          px={[3, 4, 8, 8]}
          h="75px"
          fontSize={["md", "lg", "2xl", "2xl"]}
          sx={{ borderRadius: "20px" }}
          leftIcon={
            <Image
              w={10}
              h={10}
              src="/images/phone_icon.png"
              alt="phone us icon"
            />
          }
          bgGradient="linear(to-b, #FFFFFF 0%, #4FE44C 20%,#026f00 100%)"
          dropShadow="dark-lg"
          fontWeight="bold"
          onClick={() => {
            window.location.href = "https://wa.me/8918542704"
          }}
        >
          Contact Us
        </Button>
        <Button
          bgColor="#4FE44C"
          px={[3, 4, 8, 8]}
          color="black"
          h="75px"
          fontSize={["md", "lg", "2xl", "2xl"]}
          sx={{ borderRadius: "20px" }}
          bgGradient="linear(to-b, #FFFFFF 0%, #4FE44C 20%,#026f00 100%)"
          leftIcon={
            <Image
              w={10}
              h={10}
              src="/images/add_icon.png"
              alt="add property icon"
            />
          }
          dropShadow="dark-lg"
          fontWeight="bold"
          onClick={() => {
            if (!authUser) {
              showToast("Please login to access this feature", "error", toast)
              router.push("/login")
            } else {
              router.push("/property")
            }
          }}
        >
          Add Properties
        </Button>
      </Flex>

      {featuredHouse && featuredHouse.length > 0 && (
        <Box pt={8}>
          <Text fontWeight="bold" fontSize="4xl" color="white" pb={6}>
            Featured Houses
          </Text>
          <Flex direction="row" overflow="auto" columnGap={3}>
            {featuredHouse &&
              featuredHouse.map((property) => {
                return (
                  <Box key={property.propertyid} mb={4}>
                    <PropertyTab
                      property={property}
                      maxWidth="450px"
                      minWidth="400px"
                      imageHeight="215px"
                      type="search"
                    />
                  </Box>
                )
              })}
            {featuredHouse && featuredHouse.length === 0 && (
              <Text>No properties to be displayed</Text>
            )}
          </Flex>
        </Box>
      )}
      {featuredFlats && featuredFlats.length > 0 && (
        <Box pt={8}>
          <Text fontWeight="bold" fontSize="4xl" color="white" pb={6}>
            Featured Flats
          </Text>
          <Flex direction="row" overflow="auto" columnGap={3}>
            {featuredFlats &&
              featuredFlats.map((property) => {
                return (
                  <Box key={property.propertyid} mb={4}>
                    <PropertyTab
                      property={property}
                      maxWidth="450px"
                      minWidth="400px"
                      imageHeight="215px"
                      type="search"
                    />
                  </Box>
                )
              })}
            {featuredFlats && featuredFlats.length === 0 && (
              <Text>No properties to be displayed</Text>
            )}
          </Flex>
        </Box>
      )}
      {featuredCommercial && featuredCommercial.length > 0 && (
        <Box pt={8}>
          <Text fontWeight="bold" fontSize="4xl" color="white" pb={6}>
            Featured Plots
          </Text>
          <Flex direction="row" overflow="auto" columnGap={3}>
            {featuredPlots &&
              featuredPlots.map((property) => {
                return (
                  <Box key={property.propertyid} mb={4}>
                    <PropertyTab
                      property={property}
                      maxWidth="450px"
                      minWidth="400px"
                      imageHeight="215px"
                      type="search"
                    />
                  </Box>
                )
              })}
            {featuredPlots && featuredPlots.length === 0 && (
              <Text>No properties to be displayed</Text>
            )}
          </Flex>
        </Box>
      )}
      {featuredCommercial && featuredCommercial.length > 0 && (
        <Box pt={8}>
          <Text fontWeight="bold" fontSize="4xl" color="white" pb={6}>
            Featured Commercial
          </Text>
          <Flex direction="row" overflow="auto" columnGap={3}>
            {featuredCommercial &&
              featuredCommercial.map((property) => {
                return (
                  <Box key={property.propertyid} mb={4}>
                    <PropertyTab
                      property={property}
                      maxWidth="450px"
                      minWidth="400px"
                      imageHeight="215px"
                      type="search"
                    />
                  </Box>
                )
              })}
          </Flex>
        </Box>
      )}
    </Flex>
  )
}
