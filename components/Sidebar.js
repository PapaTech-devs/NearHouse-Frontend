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
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaHamburger } from "react-icons/fa";
import * as NextLink from "next/link";
import { useAuth } from "../hooks/contextHooks";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { authUser, signMeOut } = useAuth();
  return (
    <>
      <IconButton
        aria-label="Menu Icon"
        icon={<Icon as={FaHamburger} />}
        onClick={onOpen}
        ref={btnRef}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack alignItems={"start"} spacing={4} pt="2">
              <NextLink href="/search">
                <Link fontSize="lg">Search</Link>
              </NextLink>
              <NextLink href="/listproperty">
                <Link fontSize="lg">List Property</Link>
              </NextLink>
              <NextLink href="/about">
                <Link fontSize="lg">About</Link>
              </NextLink>
              {!authUser ? (
                <NextLink href="/login">
                  <Link fontSize="lg">Login</Link>
                </NextLink>
              ) : (
                <Button
                  size="lg"
                  color="black"
                  fontWeight="normal"
                  variant="link"
                  onClick={() => signMeOut()}
                >
                  Logout
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
