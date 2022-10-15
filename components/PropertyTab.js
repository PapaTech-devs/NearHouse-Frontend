import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  useToast,
  HStack,
  Icon,
  Tooltip,
} from "@chakra-ui/react"
import Link from "next/link"
import { usePropertyContext } from "../hooks/propertyContext"
import { MdModeEdit, MdConstruction, MdVerified } from "react-icons/md"
import { BsFillTrashFill, BsCompass } from "react-icons/bs"
import { BiMedal } from "react-icons/bi"
import { deleteProperty } from "../utils"
import { useState } from "react"

export default function PropertyTab({
  property,
  maxWidth,
  imageHeight,
  type,
  editProperty,
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
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  })
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
            <IconButton
              position="absolute"
              right="10px"
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
            <IconButton
              position="absolute"
              right="60px"
              top="10px"
              isLoading={deleteLoading}
              size="md"
              colorScheme="red"
              onClick={async (e) => {
                e.stopPropagation()
                e.preventDefault()
                setDeleteLoading(true)
                await deleteProperty(property)
                setDeleteLoading(false)
                setMyProperties(
                  myProperties.filter(
                    (p) => p.propertyid !== property.propertyid
                  )
                )
                setAllProperties(
                  allProperties.filter(
                    (p) => p.propertyid !== property.propertyid
                  )
                )
                setFilteredProperties(
                  filteredProperties.filter(
                    (p) => p.propertyid !== property.propertyid
                  )
                )
                toast({
                  title: "Property Deleted",
                  description: "Property is deleted successfully",
                  status: "success",
                  duration: 5500,
                  isClosable: true,
                })
              }}
              icon={<BsFillTrashFill />}
            />
          </>
        )}
        <Box py="4" gap={4} px="2">
          {property.priceType === "lumpsum" ? (
            <Text fontWeight="black" fontSize="4xl">
              {formatter.format(parseFloat(property.price))}
            </Text>
          ) : (
            <Text fontWeight="black" fontSize="4xl">
              EMI starts with ₹{property.price}/month
            </Text>
          )}
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
          <Text fontSize="lg" color="gray.500">
            {property.address}
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
        </Box>
      </Flex>
    </Link>
  )
}
