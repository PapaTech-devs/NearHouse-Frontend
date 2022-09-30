import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import PropertyInfo from "./PropertyInfo"
import PropertyLocation from "./PropertyLocation"
import PropertyPictures from "./PropertyPictures"
import { v4 as uuidV4 } from "uuid"
import { useAuth } from "../../hooks/contextHooks"
import { storeProperty, updateProperty } from "../../utils"
import { usePropertyContext } from "../../hooks/propertyContext"

export default function AddPropertyTabs({ setAdd, editingProperty }) {
  const toast = useToast()
  const { authUser } = useAuth()
  const { myProperties, setMyProperties } = usePropertyContext()
  const [loadingText, setLoadingText] = useState(null)
  const [values, setValues] = useState({
    propertyid: editingProperty ? editingProperty.propertyid : uuidV4(),
    title: editingProperty ? editingProperty.title : "",
    description: editingProperty ? editingProperty.description : "",
    owner: editingProperty ? editingProperty.owner : "",
    region: editingProperty ? editingProperty.region : "",
    propertyType: editingProperty ? editingProperty.propertyType : "",
    bhk: editingProperty ? editingProperty.bhk : "",
    area: editingProperty ? editingProperty.area : "",
    areaType: editingProperty ? editingProperty.areaType : "",
    address: editingProperty ? editingProperty.address : "",
    facing: editingProperty ? editingProperty.facing : "",
    verified: editingProperty ? editingProperty.verified : "",
    price: editingProperty ? editingProperty.price : "",
    priceType: editingProperty ? editingProperty.priceType : "",
    landType: editingProperty ? editingProperty.landType : "",
    numFloor: editingProperty ? editingProperty.numFloor : "",
    numBath: editingProperty ? editingProperty.numBath : "",
    currentStatus: editingProperty ? editingProperty.currentStatus : "",
    furnishType: editingProperty ? editingProperty.furnishType : "",
    numParkingDependent: editingProperty
      ? editingProperty.numParkingDependent
      : "",
    numParkingIndependent: editingProperty
      ? editingProperty.numParkingIndependent
      : "",
    numBalcony: editingProperty ? editingProperty.numBalcony : "",
    floorNo: editingProperty ? editingProperty.floorNo : "",
    videoLink: editingProperty ? editingProperty.videoLink : "",
    images: editingProperty ? editingProperty.images : [],
    location: editingProperty ? editingProperty.location : null,
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

  async function handleSubmit() {
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

    if (!values.title || values.title.length === 0) {
      errorObject.title = true
    } else {
      errorObject.title = false
    }

    if (!values.description || values.description.length === 0) {
      errorObject.description = true
    } else {
      errorObject.description = false
    }

    if (!values.region || values.region.length === 0) {
      errorObject.region = true
    } else {
      errorObject.region = false
    }

    if (!values.propertyType || values.propertyType.length === 0) {
      errorObject.propertyType = true
    } else {
      errorObject.propertyType = false
    }

    if (!values.bhk || values.bhk.length === 0) {
      errorObject.bhk = true
    } else {
      errorObject.bhk = false
    }

    if (!values.area || values.area.length === 0) {
      errorObject.area = true
    } else {
      errorObject.area = false
    }

    if (!values.areaType || values.areaType.length === 0) {
      errorObject.areaType = true
    } else {
      errorObject.areaType = false
    }

    if (!values.address || values.address.length === 0) {
      errorObject.address = true
    } else {
      errorObject.address = false
    }

    if (!values.facing || values.facing.length === 0) {
      errorObject.facing = true
    } else {
      errorObject.facing = false
    }

    if (!values.price || values.price.length === 0) {
      errorObject.price = true
    } else {
      errorObject.price = false
    }

    if (!values.priceType || values.priceType.length === 0) {
      errorObject.priceType = true
    } else {
      errorObject.priceType = false
    }

    if (!values.landType || values.landType.length === 0) {
      errorObject.landType = true
    } else {
      errorObject.landType = false
    }

    if (!values.numFloor || values.numFloor.length === 0) {
      errorObject.numFloor = true
    } else {
      errorObject.numFloor = false
    }

    if (!values.numBath || values.numBath.length === 0) {
      errorObject.numBath = true
    } else {
      errorObject.numBath = false
    }

    if (!values.currentStatus || values.currentStatus.length === 0) {
      errorObject.currentStatus = true
    } else {
      errorObject.currentStatus = false
    }

    if (!values.floorNo || values.floorNo.length === 0) {
      errorObject.floorNo = true
    } else {
      errorObject.floorNo = false
    }

    if (!values.location) {
      errorObject.location = true
      toast({
        title: "Invalid Fields",
        description: "Please give a valid location",
        status: "error",
        duration: 5500,
        isClosable: true,
      })
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
      (values.propertyType === "plot" && errorObject.landType)
    ) {
      toast({
        title: "Invalid Fields",
        description: "Please fill up all required fields",
        status: "error",
        duration: 5500,
        isClosable: true,
      })
      return
    }

    if (!editingProperty) {
      values.userid = authUser.userid
      const uploadedProperty = await storeProperty(values, setLoadingText)
      setMyProperties([...myProperties, uploadedProperty])
      toast({
        title: "Success",
        description: "Your property is uploaded",
        status: "success",
        duration: 5500,
        isClosable: true,
      })
    } else {
      const updatedProperty = await updateProperty(values, setLoadingText)
      setMyProperties([
        ...myProperties.filter(
          (property) => property.propertyid !== updatedProperty.propertyid
        ),
        updatedProperty,
      ])
      toast({
        title: "Success",
        description: "Your property is updated",
        status: "success",
        duration: 5500,
        isClosable: true,
      })
    }
    setAdd(false)
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
        isLoading={loadingText}
        loadingText={loadingText}
        colorScheme="teal"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Flex>
  )
}
