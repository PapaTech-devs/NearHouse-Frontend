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
  HStack,
  Grid,
  Hide,
  useDisclosure,
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
import PropertyAppointmentModal from "../components/PropertyAppointmentModal"

export default function HomePage() {
  const toast = useToast()
  const [featuredHouse, setFeaturedHouse] = useState(null)
  const [featuredFlats, setFeaturedFlats] = useState(null)
  const [featuredPlots, setFeaturedPlots] = useState(null)
  const [featuredCommercial, setFeaturedCommercial] = useState(null)
  const [wealthGeneratingAssets, setWealthGeneratingAssets] = useState(null)
  const router = useRouter()
  const { authUser } = useAuth()
  let [dynamicText, setDynamicText] = useState(0)
  const textList = ["Residential", "Flats", "Houses", "Plots", "Fractional"]
  let timer
  const BRAND_GREEN = "#2AE027"
  const SEC_BG_COLOR = "#1A1A1A"
  const SCROLL_VALUE = 400
  const containerRef = useRef(null)
  const houseRef = useRef(null)
  const flatsRef = useRef(null)
  const plotsRef = useRef(null)
  const commercialRef = useRef(null)
  const wealthRef = useRef(null)
  const [values, setValues] = useState({
    userName: "",
    userEmail: "",
    userMobileNo: "",
    appointmentDate: "",
  })
  const appointmentModal = useDisclosure()

  useEffect(() => {
    async function fetchProperty() {
      const res = await fetch("/backend/properties/featured")
      const data = await res.json()
      data.sort((property1, property2) => {
        const avgROI1 =
          parseFloat(property1.avgRentalYield ?? "0") +
          parseFloat(property1.assetAppreciationRate ?? "0")
        const avgROI2 =
          parseFloat(property2.avgRentalYield ?? "0") +
          parseFloat(property2.assetAppreciationRate ?? "0")

        return avgROI2 - avgROI1
      })
      setWealthGeneratingAssets([...data].splice(0, 6))
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
        pt={[6, 10, 12, 16]}
        justifyContent="space-between"
        gap={4}
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
            h={["5vh", "10vh", "10vh", "9vh"]}
            onClick={() => router.push("/search")}
            sx={{ borderRadius: "5px" }}
          >
            Search properties near you
          </Button>
          <Heading fontSize={["4xl", "4xl", "4xl", "5xl"]}>
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
            h={["63px", "76px", "76px", "76px"]}
            w={["220px", "268px", "268px", "268px"]}
            justifyContent="flex-start"
            px={4}
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
            <Text
              fontWeight="bold"
              color="black"
              fontSize={["larger", "25px", "25px", "25px"]}
            >
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
        <Text
          fontWeight="bold"
          fontSize={["3xl", "3xl", "3xl", "4xl"]}
          color="white"
          pb={6}
          textAlign={["center", "center", "left", "left"]}
        >
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
            _hover={{ bgColor: BRAND_GREEN }}
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
            _hover={{ bgColor: BRAND_GREEN }}
            color="black"
            onClick={() => {
              containerRef.current.scrollLeft += SCROLL_VALUE
            }}
            icon={<AiOutlineArrowRight />}
          />
          <Flex
            minW={["100%", "100%", "100%", "400px"]}
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
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Earn up to 5% Rental Yield</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Starts from 12.5Lacs</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>No brokerage Associated</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            minW={["100%", "100%", "100%", "400px"]}
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
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Earn up to 3% Rental Yield</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Starts from 35Lacs</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>No brokerage Associated</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            minW={["100%", "100%", "100%", "400px"]}
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
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Earn up to 22% IRR</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Starts from 5Lacs</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>High Capital Appreciation</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            minW={["100%", "100%", "100%", "400px"]}
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
            <Flex
              fontSize="lg"
              color="gray.400"
              direction="column"
              gap={1}
              mx={6}
            >
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Earn up to 15% IRR</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Starts from 2Lacs</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Co-own properties with great ROI</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            minW={["100%", "100%", "100%", "400px"]}
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
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Earn up to 16% IRR</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Start investing with ₹400</Text>
              </Flex>
              <Flex gap={2}>
                <Image
                  w={6}
                  h={6}
                  src="/images/green_tick_icon.png"
                  alt="green tick icon"
                />
                <Text>Sell anytime, just like stocks</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Text
        fontWeight="bold"
        fontSize={["4xl", "4xl", "4xl", "5xl"]}
        color="white"
        my={12}
        textAlign={["center", "center", "left", "left"]}
      >
        See What Others Like The Most
      </Text>

      {featuredHouse && featuredHouse.length > 0 && (
        <Box
          bgColor={SEC_BG_COLOR}
          mx={["-1.5rem", "-2.5rem", "-2.5rem", "-3rem"]}
          pb="8"
        >
          <Box
            pt={8}
            position="relative"
            px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
          >
            <Text
              fontWeight="bold"
              fontSize={["3xl", "3xl", "3xl", "4xl"]}
              color="white"
              pb={6}
              textAlign={["center", "center", "left", "left"]}
            >
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
              mx={["-1.2rem", "-2.5rem", "0rem", "0rem"]}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <>
                <IconButton
                  position="absolute"
                  left={["25px", "30px", "40px", "50px"]}
                  top="57%"
                  zIndex={2}
                  rounded="full"
                  transform="translate(-50%,-50%)"
                  size="lg"
                  bgColor={BRAND_GREEN}
                  opacity={0.75}
                  _hover={{ bgColor: BRAND_GREEN }}
                  color="black"
                  onClick={() => {
                    houseRef.current.scrollLeft -= SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowLeft />}
                />
                <IconButton
                  position="absolute"
                  right={["-25px", "-15px", "-5px", "0px"]}
                  top="57%"
                  rounded="full"
                  opacity={0.75}
                  _hover={{ bgColor: BRAND_GREEN }}
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
                          maxWidth={["100%", "100%", "100%", "450px"]}
                          minWidth={["100%", "100%", "100%", "400px"]}
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
        <Box mx={["-1.5rem", "-2.5rem", "-2.5rem", "-3rem"]} pb="8">
          <Box
            pt={8}
            position="relative"
            px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
          >
            <Text
              fontWeight="bold"
              fontSize={["3xl", "3xl", "3xl", "4xl"]}
              color="white"
              pb={6}
              textAlign={["center", "center", "left", "left"]}
            >
              Our Top Recommended{" "}
              <Text color={BRAND_GREEN} as="span">
                Flats
              </Text>
            </Text>
            <Flex
              direction="row"
              ref={flatsRef}
              scrollBehavior="smooth"
              overflow="auto"
              mx={["-1.2rem", "-2.5rem", "0rem", "0rem"]}
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
                  left={["25px", "30px", "40px", "50px"]}
                  top="57%"
                  zIndex={2}
                  rounded="full"
                  opacity={0.75}
                  _hover={{ bgColor: BRAND_GREEN }}
                  transform="translate(-50%,-50%)"
                  size="lg"
                  bgColor={BRAND_GREEN}
                  color="black"
                  onClick={() => {
                    flatsRef.current.scrollLeft -= SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowLeft />}
                />
                <IconButton
                  position="absolute"
                  right={["-25px", "-15px", "-5px", "0px"]}
                  top="57%"
                  rounded="full"
                  zIndex={2}
                  opacity={0.75}
                  _hover={{ bgColor: BRAND_GREEN }}
                  transform="translate(-50%,-50%)"
                  size="lg"
                  bgColor={BRAND_GREEN}
                  color="black"
                  onClick={() => {
                    flatsRef.current.scrollLeft += SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowRight />}
                />
                {featuredFlats &&
                  featuredFlats.map((property) => {
                    return (
                      <Box key={property.propertyid} mb={4}>
                        <PropertyTab
                          property={property}
                          maxWidth={["100%", "100%", "100%", "450px"]}
                          minWidth={["100%", "100%", "100%", "400px"]}
                          imageHeight="215px"
                          type="search"
                        />
                      </Box>
                    )
                  })}
                {featuredFlats && featuredFlats.length === 0 && (
                  <Text>No properties to be displayed</Text>
                )}
              </>
            </Flex>
          </Box>
        </Box>
      )}
      {featuredPlots && featuredPlots.length > 0 && (
        <Box
          bgColor={SEC_BG_COLOR}
          mx={["-1.5rem", "-2.5rem", "-2.5rem", "-3rem"]}
          pb="8"
        >
          <Box
            pt={8}
            position="relative"
            px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
          >
            <Text
              fontWeight="bold"
              fontSize={["3xl", "3xl", "3xl", "4xl"]}
              color="white"
              pb={6}
              textAlign={["center", "center", "left", "left"]}
            >
              Our Top Recommended{" "}
              <Text color={BRAND_GREEN} as="span">
                Plots
              </Text>
            </Text>
            <Flex
              direction="row"
              ref={plotsRef}
              scrollBehavior="smooth"
              overflow="auto"
              mx={["-1.2rem", "-2.5rem", "0rem", "0rem"]}
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
                  top="57%"
                  zIndex={2}
                  left={["25px", "30px", "40px", "50px"]}
                  rounded="full"
                  transform="translate(-50%,-50%)"
                  size="lg"
                  opacity={0.75}
                  _hover={{ bgColor: BRAND_GREEN }}
                  bgColor={BRAND_GREEN}
                  color="black"
                  onClick={() => {
                    plotsRef.current.scrollLeft -= SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowLeft />}
                />
                <IconButton
                  position="absolute"
                  right={["-25px", "-15px", "-5px", "0px"]}
                  top="57%"
                  rounded="full"
                  zIndex={2}
                  opacity={0.75}
                  _hover={{ bgColor: BRAND_GREEN }}
                  transform="translate(-50%,-50%)"
                  size="lg"
                  bgColor={BRAND_GREEN}
                  color="black"
                  onClick={() => {
                    plotsRef.current.scrollLeft += SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowRight />}
                />
                {featuredPlots &&
                  featuredPlots.map((property) => {
                    return (
                      <Box key={property.propertyid} mb={4}>
                        <PropertyTab
                          property={property}
                          maxWidth={["100%", "100%", "100%", "450px"]}
                          minWidth={["100%", "100%", "100%", "400px"]}
                          imageHeight="215px"
                          type="search"
                        />
                      </Box>
                    )
                  })}
                {featuredPlots && featuredPlots.length === 0 && (
                  <Text>No properties to be displayed</Text>
                )}
              </>
            </Flex>
          </Box>
        </Box>
      )}
      {featuredCommercial && featuredCommercial.length > 0 && (
        <Box mx={["-1.5rem", "-2.5rem", "-2.5rem", "-3rem"]} pb="8">
          <Box
            pt={8}
            position="relative"
            px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
          >
            <Text
              fontWeight="bold"
              fontSize={["3xl", "3xl", "3xl", "4xl"]}
              color="white"
              pb={6}
              textAlign={["center", "center", "left", "left"]}
            >
              Our Top Recommended{" "}
              <Text color={BRAND_GREEN} as="span">
                Plots
              </Text>
            </Text>
            <Flex
              direction="row"
              ref={commercialRef}
              mx={["-1.2rem", "-2.5rem", "0rem", "0rem"]}
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
                  top="57%"
                  zIndex={2}
                  left={["25px", "30px", "40px", "50px"]}
                  rounded="full"
                  transform="translate(-50%,-50%)"
                  size="lg"
                  opacity={0.75}
                  _hover={{ bgColor: BRAND_GREEN }}
                  bgColor={BRAND_GREEN}
                  color="black"
                  onClick={() => {
                    commercialRef.current.scrollLeft -= SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowLeft />}
                />
                <IconButton
                  position="absolute"
                  right={["-25px", "-15px", "-5px", "0px"]}
                  top="57%"
                  rounded="full"
                  zIndex={2}
                  opacity={0.75}
                  _hover={{ bgColor: BRAND_GREEN }}
                  transform="translate(-50%,-50%)"
                  size="lg"
                  bgColor={BRAND_GREEN}
                  color="black"
                  onClick={() => {
                    commercialRef.current.scrollLeft += SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowRight />}
                />
                {featuredCommercial &&
                  featuredCommercial.map((property) => {
                    return (
                      <Box key={property.propertyid} mb={4}>
                        <PropertyTab
                          property={property}
                          maxWidth={["100%", "100%", "100%", "450px"]}
                          minWidth={["100%", "100%", "100%", "400px"]}
                          imageHeight="215px"
                          type="search"
                        />
                      </Box>
                    )
                  })}
              </>
            </Flex>
          </Box>
        </Box>
      )}
      {wealthGeneratingAssets && wealthGeneratingAssets.length > 0 && (
        <Box
          bgColor={SEC_BG_COLOR}
          mx={["-1.5rem", "-2.5rem", "-2.5rem", "-3rem"]}
          pb="8"
        >
          <Box
            pt={8}
            position="relative"
            px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
          >
            <Text
              fontWeight="bold"
              fontSize={["4xl", "4xl", "4xl", "5xl"]}
              color="white"
              pb={4}
              textAlign={["center", "center", "left", "left"]}
            >
              Our Top Wealth Generating{" "}
              <Text color={BRAND_GREEN} as="span">
                Assets
              </Text>
            </Text>
            <Text
              fontWeight="semibold"
              fontSize={["2xl", "2xl", "2xl", "3xl"]}
              color="gray.300"
              pb={6}
              textAlign={["center", "center", "left", "left"]}
            >
              Properties with Highest Average ROI
            </Text>
            <Flex
              direction="row"
              ref={wealthRef}
              mx={["-1.2rem", "-2.5rem", "0rem", "0rem"]}
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
                  left={["25px", "30px", "40px", "50px"]}
                  top="57%"
                  size="lg"
                  zIndex={2}
                  rounded="full"
                  opacity={0.75}
                  transform="translate(-50%,-50%)"
                  bgColor={BRAND_GREEN}
                  color="black"
                  _hover={{ bgColor: BRAND_GREEN }}
                  onClick={() => {
                    wealthRef.current.scrollLeft -= SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowLeft />}
                />
                <IconButton
                  position="absolute"
                  right={["-25px", "-15px", "-5px", "0px"]}
                  top="57%"
                  rounded="full"
                  zIndex={2}
                  transform="translate(-50%,-50%)"
                  size="lg"
                  opacity={0.75}
                  bgColor={BRAND_GREEN}
                  color="black"
                  _hover={{ bgColor: BRAND_GREEN }}
                  onClick={() => {
                    wealthRef.current.scrollLeft += SCROLL_VALUE
                  }}
                  icon={<AiOutlineArrowRight />}
                />
                {wealthGeneratingAssets &&
                  wealthGeneratingAssets.map((property) => {
                    return (
                      <Box key={property.propertyid} mb={4}>
                        <PropertyTab
                          property={property}
                          maxWidth={["100%", "100%", "100%", "450px"]}
                          minWidth={["100%", "100%", "100%", "400px"]}
                          imageHeight="215px"
                          type="search"
                        />
                      </Box>
                    )
                  })}
                {wealthGeneratingAssets &&
                  wealthGeneratingAssets.length === 0 && (
                    <Text>No properties to be displayed</Text>
                  )}
              </>
            </Flex>
          </Box>
        </Box>
      )}
      <Flex py="8" direction="column">
        <Text
          fontWeight="bold"
          fontSize={["4xl", "4xl", "4xl", "5xl"]}
          color="white"
          py={4}
          textAlign={["center", "center", "left", "left"]}
        >
          Get Instant Loan From India&apos;s{" "}
          <Text color={BRAND_GREEN} as="span">
            Top Banks
          </Text>
        </Text>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          direction={["column", "column", "column", "row"]}
        >
          <Flex
            direction="column"
            gap={6}
            alignItems={["center", "center", "flex-start", "flex-start"]}
          >
            <Text
              fontSize={["2xl", "2xl", "2xl", "4xl"]}
              fontWeight="semibold"
              color="gray.300"
              textAlign={["center", "center", "left", "left"]}
            >
              Avail Loans against properties with great ease and best interest
              rates
            </Text>
            <Flex direction="row" gap={4}>
              <Flex gap={2} alignItems="center">
                <Image
                  src="/images/sbi_icon.png"
                  alt="sbi bank icon"
                  w={38}
                  h={38}
                />
                <Text fontSize={["md", "md", "2xl", "3xl"]} fontWeight="bold">
                  SBI
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Image
                  src="/images/hdfc_icon.png"
                  alt="hdfc bank icon"
                  w={38}
                  h={38}
                />
                <Text fontSize={["md", "md", "2xl", "3xl"]} fontWeight="bold">
                  HDFC
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Image
                  src="/images/icici_icon.png"
                  alt="icici bank icon"
                  w={38}
                  h={38}
                />
                <Text fontSize={["md", "md", "2xl", "3xl"]} fontWeight="bold">
                  ICICI
                </Text>
              </Flex>
              <Flex gap={2} alignItems="center">
                <Image
                  src="/images/axis_icon.png"
                  alt="axis bank icon"
                  w={38}
                  h={38}
                />
                <Text fontSize={["md", "md", "2xl", "3xl"]} fontWeight="bold">
                  AXIS
                </Text>
              </Flex>
            </Flex>
            <Button
              bgColor="#FACF11"
              color="black"
              _hover={{ bg: "#FACF11" }}
              w="250px"
              h="80px"
              fontSize="2xl"
              onClick={() => {
                if (authUser) appointmentModal.onOpen()
                else {
                  showToast("Please login to fix appointment.", "error", toast)
                  router.push("/login")
                }
              }}
            >
              Check Eligibility
            </Button>
          </Flex>
          <Image
            src="/images/bank_icon.svg"
            alt="bank icon"
            my={8}
            w={["100%", "100%", "100%", "40%"]}
          />
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          gap={8}
          position="relative"
          pt={8}
          pb={16}
        >
          <Text
            fontWeight="bold"
            fontSize={["4xl", "4xl", "4xl", "5xl"]}
            color="white"
            py={4}
            textAlign="center"
          >
            Why Indians Love{" "}
            <Text color={BRAND_GREEN} as="span">
              Real Estate?
            </Text>
          </Text>
          <Flex
            w={["100%", "100%", "70%", "70%"]}
            direction={["column", "column", "column", "row"]}
            gap={9}
            mb={6}
            alignItems="center"
          >
            <Image
              src="/images/blue_tick.svg"
              alt="blue tick svg image"
              w={150}
              h={150}
            />
            <Flex direction="column">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                textAlign={["center", "center", "left", "left"]}
                pb={4}
              >
                Secured Investment
              </Text>
              <Text
                fontSize="2xl"
                color="gray.300"
                fontWeight="semibold"
                textAlign={["center", "center", "left", "left"]}
              >
                A Real estate investments secure your future by providing
                long-term stability. It outperforms inflation as its less
                susceptible to market fluctuations.
              </Text>
            </Flex>
          </Flex>
          <Flex
            w={["100%", "100%", "70%", "70%"]}
            direction={["column", "column", "column", "row"]}
            gap={6}
            mb={6}
            alignItems="center"
          >
            <Image
              src="/images/time_money.svg"
              alt="time money rotating clock svg"
              w={150}
              h={150}
            />
            <Flex direction="column">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                textAlign={["center", "center", "left", "left"]}
                pb={4}
              >
                Stable Returns
              </Text>
              <Text
                fontSize="2xl"
                color="gray.300"
                fontWeight="semibold"
                textAlign={["center", "center", "left", "left"]}
              >
                A Real Estate investments secure your future by providing
                long-term stability. It outperformes inflation as its less
                susceptible to market fluctuations.
              </Text>
            </Flex>
          </Flex>
          <Flex
            w={["100%", "100%", "70%", "70%"]}
            direction={["column", "column", "column", "row"]}
            gap={6}
            alignItems="center"
          >
            <Image
              src="/images/money_gif.gif"
              alt="rotating money animation"
              w={150}
              h={150}
            />
            <Flex direction="column">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                textAlign={["center", "center", "left", "left"]}
                pb={4}
              >
                Easily Leveragable
              </Text>
              <Text
                fontSize="2xl"
                color="gray.300"
                fontWeight="semibold"
                textAlign={["center", "center", "left", "left"]}
              >
                A Real estate investments secure your future by providing
                long-term stability. It outperforms inflation as its less
                susceptible to market fluctuations.
              </Text>
            </Flex>
            <Hide below="md">
              <Image
                position="absolute"
                top="35%"
                right="45px"
                src="/images/star_icon.png"
                alt="star icon"
                w={150}
                h={150}
              />
              <Image
                position="absolute"
                top="60%"
                right="15px"
                src="https://media-public.canva.com/tjpis/MABk_Ztjpis/3/t.png"
                alt="blank star icon"
                w={150}
                h={150}
              />
            </Hide>
          </Flex>
        </Flex>
        <Box
          bgColor={SEC_BG_COLOR}
          mx={["-1.5rem", "-2.5rem", "-2.5rem", "-3rem"]}
        >
          <Flex
            direction="column"
            alignItems="center"
            position="relative"
            py={12}
            mx={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
          >
            <Text
              fontWeight="bold"
              fontSize={["3xl", "3xl", "3xl", "4xl"]}
              color="white"
            >
              Testimonials
            </Text>
            <Text
              fontWeight="bold"
              fontSize={["4xl", "4xl", "4xl", "5xl"]}
              color="gray.300"
              textAlign="center"
            >
              What people say about us?
            </Text>
            <Flex gap={6} mt={8} direction={["column", "row", "row", "row"]}>
              <Flex direction="column" gap={4}>
                <Text fontSize="lg" color="gray.300" fontWeight="semibold">
                  A Real estate investments secure your future by providing
                  long-term stability. It outperforms inflation as its less
                  susceptible to market fluctuations.
                </Text>
                <HStack>
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                </HStack>
                <Box h="4px" w="55px" bgColor={BRAND_GREEN} rounded="lg">
                  {""}
                </Box>
                <Flex alignItems="center" gap={4}>
                  <Box bgColor="white" rounded="full">
                    <Image
                      src="/images/default_user.png"
                      alt="default user"
                      w={45}
                      h={45}
                    />
                  </Box>
                  <Text fontWeight="semibold" fontSize="lg">
                    R Madavan
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap={4}>
                <Text fontSize="lg" color="gray.300" fontWeight="semibold">
                  A Real estate investments secure your future by providing
                  long-term stability. It outperforms inflation as its less
                  susceptible to market fluctuations.
                </Text>
                <HStack>
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                </HStack>
                <Box h="4px" w="55px" bgColor={BRAND_GREEN} rounded="lg">
                  {""}
                </Box>
                <Flex alignItems="center" gap={4}>
                  <Box bgColor="white" rounded="full">
                    <Image
                      src="/images/default_user.png"
                      alt="default user"
                      w={45}
                      h={45}
                    />
                  </Box>
                  <Text fontWeight="semibold" fontSize="lg">
                    R Madavan
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" gap={4}>
                <Text fontSize="lg" color="gray.300" fontWeight="semibold">
                  A Real estate investments secure your future by providing
                  long-term stability. It outperforms inflation as its less
                  susceptible to market fluctuations.
                </Text>
                <HStack>
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                  <Image
                    src="/images/star_icon.png"
                    alt="star icon"
                    w={35}
                    h={35}
                  />
                </HStack>
                <Box h="4px" w="55px" bgColor={BRAND_GREEN} rounded="lg">
                  {""}
                </Box>
                <Flex alignItems="center" gap={4}>
                  <Box bgColor="white" rounded="full">
                    <Image
                      src="/images/default_user.png"
                      alt="default user"
                      w={45}
                      h={45}
                    />
                  </Box>
                  <Text fontWeight="semibold" fontSize="lg">
                    R Madavan
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Flex
          direction="column"
          alignItems="center"
          position="relative"
          py={10}
          mx={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
        >
          <Text
            fontWeight="bold"
            fontSize={["4xl", "4xl", "4xl", "5xl"]}
            textAlign="center"
          >
            All the{" "}
            <Text color={BRAND_GREEN} as="span">
              tools
            </Text>{" "}
            you need!
          </Text>
          <Grid
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
            ]}
            pt={8}
            gap={[4, 4, 4, 6]}
          >
            <Flex
              direction="column"
              alignItems="center"
              p={[4, 5, 6, 8]}
              bgColor="#4C00ED"
              rounded="lg"
              gap={4}
            >
              <Image
                src="/images/calculator_icon.png"
                alt="calculator icon"
                w={85}
                h={85}
              />
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                EMI Calculator
              </Text>
            </Flex>
            <Flex
              direction="column"
              alignItems="center"
              p={[4, 5, 6, 8]}
              bgColor="#EF6047"
              rounded="lg"
              gap={4}
            >
              <Image
                src="/images/stopwatch_icon.png"
                alt="stopwatch icon"
                w={85}
                h={85}
              />
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                Bastu Checker
              </Text>
            </Flex>
            <Flex
              direction="column"
              alignItems="center"
              p={[4, 5, 6, 8]}
              bgColor="#FFA728"
              rounded="lg"
              gap={4}
            >
              <Image
                src="/images/bar_graph_icon.png"
                alt="bar graph icon"
                w={85}
                h={85}
              />
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                ROI Calculator
              </Text>
            </Flex>
            <Flex
              direction="column"
              alignItems="center"
              p={[4, 5, 6, 8]}
              bgColor="#2BA8AB"
              rounded="lg"
              gap={4}
            >
              <Image
                src="/images/calculator_icon.png"
                alt="calculator icon"
                w={85}
                h={85}
              />
              <Text fontWeight="bold" fontSize="2xl" textAlign="center">
                EMI Calculator
              </Text>
            </Flex>
          </Grid>
        </Flex>
      </Flex>
      <PropertyAppointmentModal
        values={values}
        setValues={setValues}
        isOpen={appointmentModal.isOpen}
        onClose={appointmentModal.onClose}
        propertyid="loan"
      />
    </Flex>
  )
}
