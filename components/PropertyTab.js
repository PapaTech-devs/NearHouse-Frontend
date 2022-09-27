import { Box, Flex, Image, Text } from "@chakra-ui/react"
import Link from "next/link"
import { usePropertyContext } from "../hooks/propertyContext"

export default function PropertyTab({ property }) {
  const { setSelectedProperty } = usePropertyContext()
  return (
    <Link href={`/property/${property.propertyId}`}>
      <Flex
        onMouseEnter={() => setSelectedProperty(property.propertyId)}
        onMouseLeave={() => setSelectedProperty(null)}
        direction="column"
        cursor="pointer"
        border="1px"
        borderColor="gray.200"
        borderRadius="2%"
        boxShadow="base"
        maxW="350px"
        _hover={{
          boxShadow: "lg",
          transitionDuration: "0.1s",
          borderColor: "gray.300",
        }}
      >
        <Image
          src={property.images[0]}
          h="150px"
          w="100%"
          borderTopRadius="2%"
          objectFit="cover"
          alt="property image"
        />
        <Box py="4" gap={4} px="2">
          {property.priceType === "lumpsum" ? (
            <Text fontWeight="bold" fontSize="3xl">
              ₹{property.price}
            </Text>
          ) : (
            <Text fontWeight="bold" fontSize="3xl">
              EMI starts with ₹{property.price}/month
            </Text>
          )}
          <Text color="gray.500">{property.title}</Text>
        </Box>
      </Flex>
    </Link>
  )
}
