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
    propertyid: uuidV4(),
    title: "",
    description: "",
    owner: false,
    region: "",
    propertyType: "",
    bhk: "",
    area: "",
    areaType: "",
    address: "",
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
    files: [],
    preview: [],
  })

  const [error, setError] = useState({
    title: false,
    description: false,
    region: false,
    propertyType: false,
    bhk: false,
    area: false,
    areaType: false,
    address: false,
    facing: false,
    price: false,
    priceType: false,
    landType: false,
    numFloor: false,
    numBath: false,
    currentStatus: false,
    furnishType: false,
    floorNo: false,
    location: false,
  })

  function handleSubmit() {
    const errorObject = {
      title: false,
      description: false,
      region: false,
      propertyType: false,
      bhk: false,
      area: false,
      areaType: false,
      address: false,
      facing: false,
      price: false,
      priceType: false,
      landType: false,
      numFloor: false,
      numBath: false,
      currentStatus: false,
      floorNo: false,
      location: false,
    }

    if (values.title.length === 0) {
      errorObject.title = true
    } else {
      errorObject.title = false
    }

    if (values.description.length === 0) {
      errorObject.description = true
    } else {
      errorObject.description = false
    }

    if (values.region.length === 0) {
      errorObject.region = true
    } else {
      errorObject.region = false
    }

    if (values.propertyType.length === 0) {
      errorObject.propertyType = true
    } else {
      errorObject.propertyType = false
    }

    if (values.bhk.length === 0) {
      errorObject.bhk = true
    } else {
      errorObject.bhk = false
    }

    if (values.area.length === 0) {
      errorObject.area = true
    } else {
      errorObject.area = false
    }

    if (values.areaType.length === 0) {
      errorObject.areaType = true
    } else {
      errorObject.areaType = false
    }

    if (values.address.length === 0) {
      errorObject.address = true
    } else {
      errorObject.address = false
    }

    if (values.facing.length === 0) {
      errorObject.facing = true
    } else {
      errorObject.facing = false
    }

    if (values.price.length === 0) {
      errorObject.price = true
    } else {
      errorObject.price = false
    }

    if (values.priceType.length === 0) {
      errorObject.priceType = true
    } else {
      errorObject.priceType = false
    }

    if (values.landType.length === 0) {
      errorObject.landType = true
    } else {
      errorObject.landType = false
    }

    if (values.numFloor.length === 0) {
      errorObject.numFloor = true
    } else {
      errorObject.numFloor = false
    }

    if (values.numBath.length === 0) {
      errorObject.numBath = true
    } else {
      errorObject.numBath = false
    }

    if (values.currentStatus.length === 0) {
      errorObject.currentStatus = true
    } else {
      errorObject.currentStatus = false
    }

    if (values.floorNo.length === 0) {
      errorObject.floorNo = true
    } else {
      errorObject.floorNo = false
    }

    if (!values.location) {
      errorObject.location = true
      alert("Please give the property location")
    } else {
      errorObject.location = false
    }

    setError(errorObject)
    if (
      errorObject.title ||
      errorObject.description ||
      errorObject.region ||
      errorObject.propertyType ||
      errorObject.area ||
      errorObject.areaType ||
      errorObject.facing ||
      errorObject.price ||
      errorObject.priceType ||
      errorObject.location ||
      errorObject.address ||
      (values.propertyType === "house" &&
        (errorObject.bhk ||
          errorObject.numBath ||
          errorObject.numFloor ||
          errorObject.furnishType ||
          errorObject.currentStatus)) ||
      (values.propertyType === "flat" &&
        (errorObject.bhk ||
          errorObject.numBath ||
          errorObject.floorNo ||
          errorObject.furnishType ||
          errorObject.currentStatus)) ||
      (values.propertyType === "house" && errorObject.landType)
    ) {
      return
    }
  }

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
            <PropertyInfo error={error} values={values} setValues={setValues} />
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
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Flex>
  )
}
