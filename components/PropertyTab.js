import { Box, Flex, Image, Text, IconButton, useToast } from "@chakra-ui/react"
import Link from "next/link"
import { usePropertyContext } from "../hooks/propertyContext"
import { MdModeEdit } from "react-icons/md"
import { BsFillTrashFill } from "react-icons/bs"
import { deleteProperty } from "../utils"
import { useState } from "react"

export default function PropertyTab({
  property,
  maxWidth,
  imageHeight,
  type,
  editProperty,
}) {
  const { setSelectedProperty, myProperties, setMyProperties } =
    usePropertyContext()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const toast = useToast()
  return (
    <Link href={`/property/${property.propertyid}`}>
      <Flex
        onMouseEnter={() => setSelectedProperty(property.propertyid)}
        onMouseLeave={() => setSelectedProperty(null)}
        direction="column"
        cursor="pointer"
        border="1px"
        borderColor="gray.200"
        borderRadius="2%"
        boxShadow="base"
        position="relative"
        maxW={maxWidth}
        minW="320px"
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
            <Text fontWeight="bold" fontSize="3xl">
              ₹{property.price}
            </Text>
          ) : (
            <Text fontWeight="bold" fontSize="3xl">
              EMI starts with ₹{property.price}/month
            </Text>
          )}
          <Text color="gray.500">{property.title}</Text>
        </Box>
      </Flex>
    </Link>
  )
}
