import { Box, Button, Flex, Heading, Hide, Show, Link } from "@chakra-ui/react"
import Sidebar from "./Sidebar"
import { HiUser, HiOutlineLogout } from "react-icons/hi"
import * as NextLink from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/contextHooks"

export default function Navbar() {
  const router = useRouter()
  const { authUser, signMeOut } = useAuth()
  return (
    <Flex
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      h="10vh"
      align="center"
      justify="space-between"
    >
      <Heading minWidth="fit-content" w="30%" size={["md", "md", "md", "lg"]}>
        <NextLink href="/" passHref>
          <Link>NearHouse</Link>
        </NextLink>
      </Heading>
      <Hide below="md">
        <Flex
          w="50%"
          justify="center"
          align="center"
          gap={10}
          fontSize={["xs", "sm", "md", "lg"]}
        >
          {/* <NextLink href="/search" passHref>
            <Link>Search</Link>
          </NextLink> */}
          {authUser && (
            <NextLink href="/property" passHref>
              <Link>List Property</Link>
            </NextLink>
          )}
          {/* <NextLink href="/about" passHref>
            <Link>About</Link>
          </NextLink> */}
        </Flex>
      </Hide>
      <Hide below="md">
        <Box w="25%">
          {!authUser ? (
            <Button
              rightIcon={<HiUser />}
              colorScheme="gray"
              variant="ghost"
              fontSize="lg"
              fontWeight="semibold"
              float={"right"}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="ghost"
              rightIcon={<HiOutlineLogout />}
              fontSize="lg"
              colorScheme="gray"
              fontWeight="semibold"
              float={"right"}
              onClick={async () => await signMeOut()}
            >
              Logout
            </Button>
          )}
        </Box>
      </Hide>
      <Show below="md">
        <Sidebar />
      </Show>
    </Flex>
  )
}
