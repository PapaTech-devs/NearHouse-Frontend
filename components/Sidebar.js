import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  IconButton,
  Icon,
  VStack,
  Button,
} from "@chakra-ui/react"
import { useRef } from "react"
import { GiBookCover, GiHamburgerMenu } from "react-icons/gi"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/contextHooks"
import { IoIosAddCircle } from "react-icons/io"
import { FaUserAlt } from "react-icons/fa"
import { HiOutlineLogout } from "react-icons/hi"
import { CgProfile } from "react-icons/cg"
import { AiOutlineSearch, AiTwotoneCalendar } from "react-icons/ai"

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
              {authUser && (
                <>
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
                  <Button
                    size="lg"
                    variant="link"
                    color="white"
                    leftIcon={<CgProfile />}
                    onClick={() => {
                      onClose()
                      router.push("/profile")
                    }}
                  >
                    Profile
                  </Button>
                </>
              )}
              <Button
                size="lg"
                variant="link"
                color="white"
                leftIcon={<AiOutlineSearch />}
                onClick={() => {
                  onClose()
                  router.push("/search")
                }}
              >
                Search
              </Button>
              <Button
                size="lg"
                variant="link"
                color="white"
                leftIcon={<GiBookCover />}
                onClick={() => {
                  onClose()
                  router.push("/blogs")
                }}
              >
                Blogs
              </Button>
              {authUser && authUser.role === "admin" && (
                <Button
                  size="lg"
                  variant="link"
                  color="white"
                  leftIcon={<AiTwotoneCalendar />}
                  onClick={() => {
                    onClose()
                    router.push("/appointments")
                  }}
                >
                  Appointments
                </Button>
              )}
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
