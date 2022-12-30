import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  useToast,
  HStack,
  useDisclosure,
  Icon,
  Button,
} from "@chakra-ui/react"
import Link from "next/link"
import { usePropertyContext } from "../hooks/propertyContext"
import { MdModeEdit, MdConstruction, MdVerified } from "react-icons/md"
import { BsFillTrashFill, BsCompass } from "react-icons/bs"
import { BiMedal } from "react-icons/bi"
import { deleteProperty, showToast } from "../utils"
import { useState } from "react"
import PropertyDeleteConfirmation from "./DeleteConfirmation"
import { BsWhatsapp } from "react-icons/bs"
import { AiFillSchedule } from "react-icons/ai"
import { ImLocation } from "react-icons/im"
import { useAuth } from "../hooks/contextHooks"
import PropertyAppointmentModal from "./PropertyAppointmentModal"

export default function PropertyTab({
  property,
  maxWidth,
  imageHeight,
  type,
  editProperty,
  minWidth,
}) {
  const {
    setSelectedProperty,
    myProperties,
    setMyProperties,
    setAllProperties,
    allProperties,
    setFilteredProperties,
    filteredProperties,
  } = usePropertyContext()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const toast = useToast()
  const deleteModal = useDisclosure()
  const bookAppointmentModal = useDisclosure()
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  })
  const [values, setValues] = useState({
    userName: "",
    userEmail: "",
    userMobileNo: "",
    appointmentDate: "",
  })
  const { authUser } = useAuth()
  const BRAND_GREEN = "#2AE027"

  const deletePropertyHandler = async () => {
    setDeleteLoading(true)
    await deleteProperty(property)
    setDeleteLoading(false)
    setMyProperties(
      myProperties.filter((p) => p.propertyid !== property.propertyid)
    )
    setAllProperties(
      allProperties.filter((p) => p.propertyid !== property.propertyid)
    )
    setFilteredProperties(
      filteredProperties.filter((p) => p.propertyid !== property.propertyid)
    )
    toast({
      title: "Property Deleted",
      description: "Property is deleted successfully",
      status: "success",
      duration: 5500,
      isClosable: true,
    })
  }

  const facingList = {
    north: "North",
    south: "South",
    east: "East",
    west: "West",
    northwest: "North West",
    northeast: "North East",
    southeast: "South East",
    southwest: "South West",
  }
  const statusList = {
    underconstruction: "Under Construction",
    readytomove: "Ready To Move",
  }
  function firstLetterCapital(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const avgROI =
    parseFloat(property.avgRentalYield ?? "0") +
    parseFloat(property.assetAppreciationRate ?? "0")

  return (
    <Link href={`/property/${property.propertyid}`}>
      <Flex
        onMouseEnter={() => setSelectedProperty(property.propertyid)}
        onMouseLeave={() => setSelectedProperty(null)}
        direction="column"
        cursor="pointer"
        border="1px"
        borderColor="gray.700"
        borderRadius="2%"
        boxShadow="base"
        position="relative"
        bgColor="gray.800"
        minWidth={minWidth}
        w="100%"
        _hover={{
          boxShadow: "lg",
          transitionDuration: "0.1s",
          borderColor: "gray.300",
        }}
      >
        <Image
          src={
            property.images.length === 0
              ? "/images/dummy.png"
              : property.images[0]
          }
          h={imageHeight}
          w="100%"
          borderTopRadius="2%"
          objectFit="cover"
          alt="property image"
        />
        {property.verified && (
          <Icon
            as={MdVerified}
            position="absolute"
            left="10px"
            top="10px"
            w={10}
            h={10}
            size="md"
            color="yellow"
          />
        )}
        {type === "edit" && (
          <>
            {editProperty && (
              <IconButton
                position="absolute"
                right="60px"
                isDisabled={deleteLoading}
                top="10px"
                size="md"
                colorScheme="whatsapp"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  editProperty()
                }}
                icon={<MdModeEdit />}
              />
            )}
            <IconButton
              position="absolute"
              right="10px"
              top="10px"
              isLoading={deleteLoading}
              size="md"
              colorScheme="red"
              onClick={async (e) => {
                e.stopPropagation()
                e.preventDefault()
                deleteModal.onOpen()
              }}
              icon={<BsFillTrashFill />}
            />
          </>
        )}
        <Box py="4" gap={4} px="2">
          {property.priceType === "lumpsum" ? (
            <Text fontWeight="black" fontSize="4xl">
              {formatter.format(parseFloat(property.price) / 1e5)} Lacs
            </Text>
          ) : (
            <Text fontWeight="black" fontSize="4xl">
              EMI starts with ₹{property.price}/month
            </Text>
          )}
          <Flex direction="column" justifyContent="space-between" gap={10}>
            <Box>
              <HStack>
                {property.propertyType !== "plot" && (
                  <Text fontWeight="bold" fontSize="lg">
                    {property.bhk} BHK
                  </Text>
                )}
                <Text fontSize="lg" fontWeight="semibold">
                  {firstLetterCapital(property.propertyType)}
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {property.area} {firstLetterCapital(property.areaType)}
                </Text>
              </HStack>
              <Text mt="1.5" fontSize="lg" color="white" fontWeight="bold">
                <Icon as={ImLocation} w={5} h={5} />
                {property.address.split("").splice(0, 30).join("")}
                {property.address.length > 30 ? "..." : ""}
              </Text>
              <HStack mt="1.5">
                <Icon as={BsCompass} w={5} h={5} />
                <Text>{facingList[property.facing]}</Text>
                {property.propertyType !== "plot" && (
                  <>
                    <Icon as={MdConstruction} w={5} h={5} />
                    <Text>{statusList[property.currentStatus]}</Text>
                  </>
                )}
                {property.propertyType === "plot" && (
                  <>
                    <Icon as={BiMedal} w={5} h={5} />
                    <Text>{firstLetterCapital(property.landType)}</Text>
                  </>
                )}
              </HStack>
              {(property.avgRentalYeild || property.assetAppreciationRate) && (
                <HStack mt="1.5" alignItems="flex-end">
                  <Image
                    w="30px"
                    h="30px"
                    src="/images/growth_graph.png"
                    alt="growth graph icon"
                  />
                  <Text color={BRAND_GREEN} fontWeight="bold" fontSize="lg">
                    {avgROI}% Average ROI
                  </Text>
                </HStack>
              )}
              {!(property.avgRentalYeild || property.assetAppreciationRate) && (
                <Box h="35px" />
              )}
            </Box>
            <HStack>
              <Button
                colorScheme="whatsapp"
                leftIcon={<BsWhatsapp />}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  window.location.href = "https://wa.me/8918542704"
                }}
              >
                Contact us
              </Button>
              <Button
                colorScheme="telegram"
                leftIcon={<AiFillSchedule />}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  if (authUser) bookAppointmentModal.onOpen()
                  else
                    showToast(
                      "Please login to fix appointment.",
                      "error",
                      toast
                    )
                }}
              >
                Book Appointment
              </Button>
            </HStack>
          </Flex>
        </Box>
        <PropertyAppointmentModal
          values={values}
          setValues={setValues}
          isOpen={bookAppointmentModal.isOpen}
          onClose={bookAppointmentModal.onClose}
          propertyid={property.propertyid}
        />
        <PropertyDeleteConfirmation
          handler={deletePropertyHandler}
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />
      </Flex>
    </Link>
  )
}
