import { Box, Button, Flex, Hide, Show, Link, Image } from "@chakra-ui/react"
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
      bgColor="black"
      color="white"
      pt="1"
    >
      <Box w="25%">
        <NextLink href="/" passHref>
          <Link>
            <Image w="29%" src="/images/brand.png" />
          </Link>
        </NextLink>
      </Box>
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
              variant="dark"
              fontSize="lg"
              float="right"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="dark"
              rightIcon={<HiOutlineLogout />}
              fontSize="lg"
              float="right"
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
