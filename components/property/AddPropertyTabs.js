import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Flex,
} from "@chakra-ui/react"
import { useState } from "react"
import PropertyInfo from "./PropertyInfo"
import PropertyLocation from "./PropertyLocation"
import PropertyPictures from "./PropertyPictures"
import { v4 as uuidV4 } from "uuid"

export default function AddPropertyTabs() {
  const [values, setValues] = useState({
    id: uuidV4(),
    title: "",
    description: "",
    owner: false,
    region: "",
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
    numParkingDependent: "",
    numParkingIndependent: "",
    numBalcony: "",
    floorNo: "",
    videoLink: "",
    images: [],
    location: null,
  })

  return (
    <Flex direction="column" rowGap="2" mb="4">
      <Tabs isLazy>
        <TabList>
          <Tab>Property Info</Tab>
          <Tab>Property Pictures</Tab>
          <Tab>Property Location</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px="-4">
            <PropertyInfo values={values} setValues={setValues} />
          </TabPanel>
          <TabPanel px="-4">
            <PropertyPictures values={values} setValues={setValues} />
          </TabPanel>
          <TabPanel px="-4">
            <PropertyLocation values={values} setValues={setValues} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button
        alignSelf="flex-end"
        size="lg"
        colorScheme="teal"
        onClick={() => console.log(values)}
      >
        Submit
      </Button>
    </Flex>
  )
}
