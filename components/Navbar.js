import {
  Icon,
  Box,
  Button,
  Flex,
  Hide,
  Show,
  Link,
  Image,
  Text,
} from "@chakra-ui/react"
import Sidebar from "./Sidebar"
import { HiUser, HiOutlineLogout } from "react-icons/hi"
import { GiBookCover } from "react-icons/gi"
import { IoIosAddCircle } from "react-icons/io"
import * as NextLink from "next/link"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/contextHooks"
import { AiOutlineSearch } from "react-icons/ai"

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
      <Box w={["100%", "50%", "25%", "25%"]}>
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
          fontWeight="semibold"
          fontSize={["xs", "sm", "md", "md"]}
        >
          {/* <NextLink href="/search" passHref>
            <Link>Search</Link>
          </NextLink> */}
          <NextLink href="/search" passHref>
            <Link>
              <Flex gap={1} justifyContent="center">
                <Icon w={6} h={6} as={AiOutlineSearch} color="white" />
                <Text>Search</Text>
              </Flex>
            </Link>
          </NextLink>
          {authUser && (
            <>
              <NextLink href="/property" passHref>
                <Link>
                  <Flex gap={1} justifyContent="center">
                    <Icon w={6} h={6} as={IoIosAddCircle} color="white" />
                    <Text>Add Properties</Text>
                  </Flex>
                </Link>
              </NextLink>
              {/* <NextLink href="/profile" passHref>
                <Link>Profile</Link>
              </NextLink> */}
            </>
          )}
          <NextLink href="/blogs" passHref>
            <Link>
              <Flex gap={1} justifyContent="center">
                <Icon w={6} h={6} pr={1} as={GiBookCover} color="white" />
                <Text>Blogs</Text>
              </Flex>
            </Link>
          </NextLink>
          {authUser && authUser.role === "admin" && (
            <NextLink href="/appointments" passHref>
              <Link>Appointments</Link>
            </NextLink>
          )}
          {/* <NextLink href="/blogs" passHref>
            <Link>Blogs</Link>
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
              _hover={{ color: "white", bg: "green.500" }}
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
              _hover={{ color: "white", bg: "red.500" }}
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
