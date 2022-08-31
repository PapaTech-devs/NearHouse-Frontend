import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import PropertyInfo from "./PropertyInfo";
import PropertyLocation from "./PropertyLocation";
import PropertyPictures from "./PropertyPictures";

export default function AddPropertyModal({ isOpen, onClose }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    owner: false,
    propertyType: "",
    bhk: "",
    area: "",
    areaType: "",
    facing: "",
    verified: false,
    price: "",
    priceType: "",
    landType: "",
    numFloor: "",
    numBath: "",
    currentStatus: "",
    furnishType: "",
    numParking: "",
    parkingType: "",
    numBalcony: "",
    floorNo: "",
  });

  return (
    <Modal size={["full", "xl", "xl", "xl"]} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Add Property</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Property Info</Tab>
              <Tab>Property Pictures</Tab>
              <Tab>Property Location</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PropertyInfo values={values} setValues={setValues} />
              </TabPanel>
              <TabPanel>
                <PropertyPictures />
              </TabPanel>
              <TabPanel>
                <PropertyLocation />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={() => console.log(values)}>
            Secondary Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
