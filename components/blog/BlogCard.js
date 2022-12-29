import Link from "next/link";
import { Box, Heading, Badge, StarIcon, Button, Image } from "@chakra-ui/react";

function BlogCard(props) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      // my={20}
      // ml={10}
      // mr={4}
      _hover={{ transform: "scale(1.1)" }}
    >
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            publised on &bull; 12/12/12
          </Box>
        </Box>
        <Image py={4} src="https://picsum.photos/300/200" alt="blogImage" />

        <Box
          mt="1"
          fontWeight="semibold"
          as="h1"
          lineHeight="tight"
          noOfLines={1}
        >
          Title
        </Box>

        <Box>Description</Box>

        <Box as="span" color="gray.600" fontSize="sm">
          <Button bgColor={"#2AE027"} color={"white"} mt={5}>
            Read more
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default BlogCard;
