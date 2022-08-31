import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import AddPropertyModal from "../components/property/AddPropertyModal";

export default function PropertyPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex h="90vh" justify={"center"} align={"center"}>
      <Head>
        <title>Add Property</title>
      </Head>
      <Button onClick={onOpen}>Add</Button>
      <AddPropertyModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
