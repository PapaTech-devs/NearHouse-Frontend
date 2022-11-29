import { Button, Flex, Grid, Image, Text, Square, Box } from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import PropertyTab from "../components/PropertyTab"

export default function HomePage() {
  const [featuredHouse, setFeaturedHouse] = useState(null)
  const [featuredFlats, setFeaturedFlats] = useState(null)
  const [featuredPlots, setFeaturedPlots] = useState(null)
  const [featuredCommercial, setFeaturedCommercial] = useState(null)

  useEffect(() => {
    async function fetchProperty() {
      const res = await fetch("/backend/properties/propertyList")
      const data = await res.json()
      setFeaturedHouse(
        data
          .filter((property) => property.propertyType === "house")
          .splice(0, 5)
      )
      setFeaturedFlats(
        data.filter((property) => property.propertyType === "flat").splice(0, 5)
      )
      setFeaturedPlots(
        data.filter((property) => property.propertyType === "land").splice(0, 5)
      )
      setFeaturedCommercial(
        data
          .filter((property) => property.propertyType === "commercial")
          .splice(0, 5)
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
        py="2"
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
        <Square border="2px" borderColor="whiteAlpha.300" borderRadius="xl">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/house_icons.jpg" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              House
            </Text>
          </Flex>
        </Square>
        <Square border="2px" borderColor="whiteAlpha.300" borderRadius="xl">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/house_icons.jpg" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              House
            </Text>
          </Flex>
        </Square>
        <Square border="2px" borderColor="whiteAlpha.300" borderRadius="xl">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/house_icons.jpg" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              House
            </Text>
          </Flex>
        </Square>
        <Square border="2px" borderColor="whiteAlpha.300" borderRadius="xl">
          <Flex
            py={["5", "5", "5", "8"]}
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            gap={3}
          >
            <Image w="55%" src="/images/house_icons.jpg" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              House
            </Text>
          </Flex>
        </Square>
        <Square border="2px" borderColor="whiteAlpha.300" borderRadius="xl">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/house_icons.jpg" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              House
            </Text>
          </Flex>
        </Square>
        <Square border="2px" borderColor="whiteAlpha.300" borderRadius="xl">
          <Flex
            py={["5", "5", "5", "8"]}
            alignItems="center"
            justifyContent="space-between"
            direction="column"
            gap={3}
          >
            <Image w="55%" src="/images/house_icons.jpg" alt="house icon" />
            <Text fontSize="2xl" fontWeight="bold">
              House
            </Text>
          </Flex>
        </Square>
      </Grid>
      <Box
        border="4px"
        borderColor="yellow.200"
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

      <Box py={8}>
        <Text fontWeight="bold" fontSize="4xl" color="white" pb={6}>
          Featured Houses
        </Text>
        <Flex direction="row" overflowX="auto" columnGap={3}>
          {featuredHouse &&
            featuredHouse.map((property) => {
              return (
                <PropertyTab
                  key={property.propertyid}
                  property={property}
                  maxWidth="450px"
                  width="450px"
                  imageHeight="215px"
                  type="search"
                />
              )
            })}
        </Flex>
      </Box>
    </Flex>
  )
}
