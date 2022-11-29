import {
  Button,
  Flex,
  Grid,
  Image,
  Text,
  Square,
  Box,
  Show,
} from "@chakra-ui/react"
import Head from "next/head"
import { BsSearch } from "react-icons/bs"

export default function HomePage() {
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
        mt="2"
        bgColor="white"
        color="black"
        fontSize={["xl", "lg", "lg", "lg"]}
        fontWeight="bold"
        textAlign="left"
        h="6vh"
      >
        Search properties near you
      </Button>
      <Grid
        my={20}
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
          position="absolute"
          right={0}
          src="/images/sparkle.png"
          alt="sparle image"
        /> */}
        <Text fontSize="3xl" fontWeight="bold">
          List Properties for free and Get Unlimited Leads
        </Text>
      </Box>
    </Flex>
  )
}
