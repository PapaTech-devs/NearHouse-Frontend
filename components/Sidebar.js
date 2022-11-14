import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  IconButton,
  Link,
  Icon,
  VStack,
  Button,
} from "@chakra-ui/react"
import { useRef } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/contextHooks"
import * as NextLink from "next/link"
import { IoIosAddCircle } from "react-icons/io"
import { FaUserAlt } from "react-icons/fa"
import { HiOutlineLogout } from "react-icons/hi"

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const router = useRouter()
  const { authUser, signMeOut } = useAuth()
  return (
    <>
      <IconButton
        aria-label="Menu Icon"
        icon={<Icon as={GiHamburgerMenu} />}
        onClick={onOpen}
        ref={btnRef}
        variant="dark"
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" background="gray.800" />
          <DrawerBody background="gray.900" color="white">
            <VStack alignItems={"start"} spacing={4} pt="8">
              {/* <NextLink href="/search">
                <Link fontSize="lg">Search</Link>
              </NextLink> */}
              {authUser && (
                <Button
                  size="lg"
                  variant="link"
                  color="white"
                  leftIcon={<IoIosAddCircle />}
                  onClick={() => {
                    onClose()
                    router.push("/property")
                  }}
                >
                  Add Properties
                </Button>
              )}
              {authUser && authUser.role === "admin" && (
                <Button
                  size="lg"
                  variant="link"
                  color="white"
                  onClick={() => {
                    onClose()
                    router.push("/appointments")
                  }}
                >
                  Appointments
                </Button>
              )}
              {/* <NextLink href="/about">
                <Link fontSize="lg">About</Link>
              </NextLink> */}
              {!authUser ? (
                <Button
                  size="lg"
                  variant="link"
                  color="white"
                  leftIcon={<FaUserAlt />}
                  onClick={() => {
                    onClose()
                    router.push("/login")
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  size="lg"
                  color="white"
                  leftIcon={<HiOutlineLogout />}
                  variant="link"
                  onClick={() => {
                    onClose()
                    signMeOut()
                  }}
                >
                  Logout
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
