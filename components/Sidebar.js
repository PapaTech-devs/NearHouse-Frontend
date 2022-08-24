import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  Text,
  IconButton,
  Link,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FaHamburger } from "react-icons/fa";
import * as NextLink from "next/link";

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
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
              <NextLink href="/">
                <Link fontSize="lg">Search</Link>
              </NextLink>
              <NextLink href="/">
                <Link fontSize="lg">List Property</Link>
              </NextLink>
              <NextLink href="/">
                <Link fontSize="lg">About</Link>
              </NextLink>
              <NextLink href="/">
                <Link fontSize="lg">Login</Link>
              </NextLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
