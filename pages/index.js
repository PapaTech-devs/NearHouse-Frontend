import {
  Button,
  Flex,
  Image,
  Text,
  Box,
  useToast,
  Heading,
  IconButton,
  Badge,
} from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import { BsSearch } from "react-icons/bs"
import PropertyTab from "../components/PropertyTab"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/contextHooks"
import { showToast } from "../utils/index"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { useRef } from "react"

export default function HomePage() {
  const [featuredHouse, setFeaturedHouse] = useState(null)
  const [featuredFlats, setFeaturedFlats] = useState(null)
  const [featuredPlots, setFeaturedPlots] = useState(null)
  const [featuredCommercial, setFeaturedCommercial] = useState(null)
  const router = useRouter()
  const { authUser } = useAuth()
  const toast = useToast()
  let [dynamicText, setDynamicText] = useState(0)
  const textList = ["Residential", "Flats", "Houses", "Plots", "Fractional"]
  let timer
  const BRAND_GREEN = "#2AE027"
  const SCROLL_VALUE = 400
  const containerRef = useRef(null)
  const houseRef = useRef(null)

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

    function updateTimer() {
      timer = setInterval(() => {
        setDynamicText((dynamicText) => (dynamicText + 1) % 5)
      }, 3500)
    }

    fetchProperty()
    updateTimer()

    return () => clearInterval(timer)
  }, [])

  return (
    <Flex
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      direction="column"
      bgColor="black"
      color="white"
    >
      <Head>
        <title>Nearhouse</title>
      </Head>
      <Flex
        direction={["column", "column", "row", "row"]}
        h={["fit-content", "fit-content", "90vh", "90vh"]}
        pt={16}
        justifyContent="space-between"
      >
        <Flex direction="column" gap={12} w={["100%", "100%", "60%", "60%"]}>
          <Button
            leftIcon={<BsSearch />}
            py="4"
            mt={4}
            bgColor="white"
            color="black"
            fontSize={["lg", "2xl", "2xl", "2xl"]}
            fontWeight="bold"
            textAlign="left"
            h={["10vh", "10vh", "10vh", "9vh"]}
            onClick={() => router.push("/search")}
            sx={{ borderRadius: "15px" }}
          >
            Search properties near you
          </Button>
          <Heading fontSize="5xl">
            List{" "}
            <Text color={BRAND_GREEN} as="span">
              Properties
            </Text>{" "}
            for free and Get Unlimited{" "}
            <Text color={BRAND_GREEN} as="span">
              Leads
            </Text>
          </Heading>
          <Flex
            backgroundImage="url('/images/button_background.svg')"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            alignSelf="flex-start"
            h="76px"
            w="268px"
            justifyContent="center"
            alignItems="center"
            gap={4}
            fontSize={["md", "lg", "2xl", "2xl"]}
            cursor="pointer"
            onClick={() => {
              if (!authUser) {
                showToast("Please login to access this feature", "error", toast)
                router.push("/login")
              } else {
                router.push("/property")
              }
            }}
          >
            <Image
              w={10}
              h={10}
              src="/images/add_icon.png"
              alt="add property icon"
            />
            <Text fontWeight="bold" color="black">
              Add Property
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Image
            alt="hero background image"
            src="/images/flat_background.png"
          />
        </Flex>
      </Flex>

      <Box pt={8} position="relative">
        <Text fontWeight="bold" fontSize="4xl" color="white" pb={6}>
          Invest in{" "}
          <Text as="span" color={BRAND_GREEN}>
            {textList[dynamicText]}
          </Text>
        </Text>
        <Flex
          direction="row"
          overflow="auto"
          columnGap={3}
          ref={containerRef}
          pb={4}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          scrollBehavior="smooth"
        >
          <IconButton
            position="absolute"
            left="5px"
            top="57%"
            zIndex={2}
            rounded="full"
            transform="translate(-50%,-50%)"
            size="lg"
            bgColor={BRAND_GREEN}
            color="black"
            onClick={() => {
              containerRef.current.scrollLeft -= SCROLL_VALUE
            }}
            icon={<AiOutlineArrowLeft />}
          />
          <IconButton
            position="absolute"
            right="-50px"
            top="57%"
            rounded="full"
            zIndex={2}
            transform="translate(-50%,-50%)"
            size="lg"
            bgColor={BRAND_GREEN}
            color="black"
            onClick={() => {
              containerRef.current.scrollLeft += SCROLL_VALUE
            }}
            icon={<AiOutlineArrowRight />}
          />
          <Flex
            minW="400px"
            h="400px"
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="8px"
            borderColor="gray.700"
            gap={5}
            rounded="2xl"
            position="relative"
          >
            <Image
              w={160}
              h={125}
              src="/images/flat_icon.png"
              alt="flat icon"
            />
            <Text
              bgColor="yellow"
              color="black"
              px={2}
              fontSize="3xl"
              fontWeight="bold"
            >
              Flats
            </Text>
            <Flex direction="column" fontSize="lg" color="gray.400" gap={1}>
              <Text>✔️ Earn up to 5% Rental Yield</Text>
              <Text>✔️ Starts from 12.5Lacs</Text>
              <Text>✔️ No brokerage Associated</Text>
            </Flex>
          </Flex>
          <Flex
            minW="400px"
            h="400px"
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="8px"
            borderColor="gray.700"
            gap={5}
            rounded="2xl"
            position="relative"
          >
            <Image
              w={160}
              h={125}
              src="/images/house_icon.svg"
              alt="house icon"
            />
            <Text
              bgColor="yellow"
              color="black"
              px={2}
              fontSize="3xl"
              fontWeight="bold"
            >
              Houses
            </Text>
            <Flex direction="column" fontSize="lg" color="gray.400" gap={1}>
              <Text>✔️ Earn up to 3% Rental Yield</Text>
              <Text>✔️ Starts from 35Lacs</Text>
              <Text>✔️ No brokerage Associated</Text>
            </Flex>
          </Flex>
          <Flex
            minW="400px"
            h="400px"
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="8px"
            borderColor="gray.700"
            gap={5}
            rounded="2xl"
            position="relative"
          >
            <Image
              w={160}
              h={125}
              src="/images/plot_icon.svg"
              alt="plot icon"
            />
            <Text
              bgColor="yellow"
              color="black"
              px={2}
              fontSize="3xl"
              fontWeight="bold"
            >
              Plots
            </Text>
            <Flex fontSize="lg" color="gray.400" gap={1} direction="column">
              <Text>✔️ Earn up to 22% IRR</Text>
              <Text>✔️ Starts from 5 Lacs</Text>
              <Text>✔️ High Capital Appreciation</Text>
            </Flex>
          </Flex>
          <Flex
            minW="400px"
            h="400px"
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="8px"
            borderColor="gray.700"
            gap={5}
            rounded="2xl"
            position="relative"
          >
            <Image
              w={130}
              h={130}
              src="/images/fractional_icon.png"
              alt="fractional icon"
            />
            <Badge
              variant="solid"
              colorScheme="green"
              position="absolute"
              top="10px"
              right="10px"
            >
              Comming Soon
            </Badge>
            <Text
              bgColor="yellow"
              color="black"
              px={2}
              fontSize="3xl"
              fontWeight="bold"
            >
              Fractional
            </Text>
            <Flex fontSize="lg" color="gray.400" direction="column" gap={1}>
              <Text>✔️ Earn upto 15% IRR</Text>
              <Text>✔️ Starts from 2 Lacs</Text>
              <Text>✔️ Co-own properties with great ROI</Text>
            </Flex>
          </Flex>
          <Flex
            minW="400px"
            h="400px"
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="8px"
            borderColor="gray.700"
            gap={5}
            rounded="2xl"
            position="relative"
          >
            <Image
              w={135}
              h={135}
              src="/images/reit_icon.png"
              alt="reit icon"
            />
            <Badge
              variant="solid"
              colorScheme="green"
              position="absolute"
              top="10px"
              right="10px"
            >
              Comming Soon
            </Badge>
            <Text
              bgColor="yellow"
              color="black"
              px={2}
              fontSize="3xl"
              fontWeight="bold"
            >
              REITs
            </Text>
            <Flex fontSize="lg" color="gray.400" direction="column" gap={1}>
              <Text>✔️ Earn upto 16% IRR</Text>
              <Text>✔️ Start investing with ₹400</Text>
              <Text>✔️ Sell anytime ,just like stocks</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {featuredHouse && featuredHouse.length > 0 && (
        <Box
          bgColor="#040303"
          mx={["-1.5rem", "-2.5rem", "-2.5rem", "-3rem"]}
          pb="8"
          mt="8"
        >
          <Box
            pt={8}
            position="relative"
            px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
          >
            <Text fontWeight="bold" fontSize="4xl" color="white" pb={6}>
              Our Top Recommended{" "}
              <Text color={BRAND_GREEN} as="span">
                Houses
              </Text>
            </Text>
            <Flex
              direction="row"
              ref={houseRef}
              scrollBehavior="smooth"
              overflow="auto"
              columnGap={3}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <>
                <IconButton
                  position="absolute"
                  left="50px"
                  top="57%"
                  zIndex={2}
                  rounded="full"
                  transform="translate(-50%,-50%)"
                  size="lg"
                  bgColor={BRAND_GREEN}
                  color="black"
                  onClick={() => {
                    houseRef.current.scrollLeft -= SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowLeft />}
                />
                <IconButton
                  position="absolute"
                  right="0px"
                  top="57%"
                  rounded="full"
                  zIndex={2}
                  transform="translate(-50%,-50%)"
                  size="lg"
                  bgColor={BRAND_GREEN}
                  color="black"
                  onClick={() => {
                    houseRef.current.scrollLeft += SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowRight />}
                />
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
              </>
              {featuredHouse && featuredHouse.length === 0 && (
                <Text>No properties to be displayed</Text>
              )}
            </Flex>
          </Box>
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
