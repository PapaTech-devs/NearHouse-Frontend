import Link from "next/link";
import {
  Box,
  Heading,
  Badge,
  StarIcon,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

function BlogCard(props) {
  return (
    <Box
      maxW="xl"
      borderWidth="0px"
      borderRadius="lg"
      overflow="hidden"
      // my={20}
      // ml={10}
      // mr={4}
      _hover={{
        md: { transform: "scale(1.1)" },
        base: { transform: "scale(1.03)" },
      }}
      color={"white"}
      w={"100%"}
      alignItems="center"
    >
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight={{ md: "semibold", base: "medium" }}
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            publised on &bull; 12/12/12
          </Box>
        </Box>
        <Box>
          <Image
            py={4}
            objectFit={"cover"}
            h={{ base: "300px", md: "300px", sm: "300px" }}
            w={{ base: "100%", md: "100%", sm: "100%" }}
            src="https://picsum.photos/300/100"
            alt="blogImage"
          />

          {/* <Box
          mt="1"
          // fontWeight="semibold"
          // as="h1"
          // lineHeight="tight"
          // noOfLines={1}
        > */}
          <Heading fontSize={{ base: "2xl", md: "4xl", sm: "3xl" }}>
            {props.title}
          </Heading>
        </Box>
        {/* </Box> */}

        {/* <Box>Description</Box>

        <Box as="span" color="gray.600" fontSize="sm">
          <Button bgColor={"#2AE027"} color={"white"} mt={5}>
            Read more
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
}

export default BlogCard;
