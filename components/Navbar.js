import { Box, Button, Flex, Heading, Hide, Show, Link } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { HiUser } from "react-icons/hi";
import * as NextLink from "next/link";

export default function Navbar() {
  return (
    <Flex
      px={["2rem", "2.5rem", "2.5rem", "4.5rem"]}
      h="10vh"
      align="center"
      justify="space-between"
    >
      <Heading minWidth="fit-content" w="30%" size={["md", "md", "md", "lg"]}>
        NearHouse
      </Heading>
      <Hide below="md">
        <Flex
          w="50%"
          justify="center"
          align="center"
          gap={10}
          fontSize={["xs", "sm", "md", "lg"]}
        >
          <NextLink href="/" passHref>
            <Link>Search</Link>
          </NextLink>
          <NextLink href="/" passHref>
            <Link>List Property</Link>
          </NextLink>
          <NextLink href="/" passHref>
            <Link>About</Link>
          </NextLink>
        </Flex>
      </Hide>
      <Hide below="md">
        <Box w="25%">
          <Button
            rightIcon={<HiUser />}
            colorScheme="gray"
            variant="ghost"
            fontSize="lg"
            fontWeight="semibold"
            float={"right"}
          >
            Login
          </Button>
        </Box>
      </Hide>
      <Show below="md">
        <Sidebar />
      </Show>
    </Flex>
  );
}
