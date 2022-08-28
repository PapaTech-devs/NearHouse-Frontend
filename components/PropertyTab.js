import { Box, Flex, Image, Text } from "@chakra-ui/react";

export default function PropertyTab({ property }) {
  return (
    <Flex
      direction="column"
      border="1px"
      borderColor="gray.200"
      borderRadius="2%"
      boxShadow="base"
    >
      <Image
        src={property.image}
        w="350px"
        h="150px"
        borderTopRadius="2%"
        objectFit="cover"
        alt="property image"
      />
      <Box py="4" gap={4} px="2">
        <Text fontWeight="bold" fontSize="2xl">
          {property.price}
        </Text>
        <Text color="gray.500">{property.title}</Text>
      </Box>
    </Flex>
  );
}
