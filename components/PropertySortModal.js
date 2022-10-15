import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Stack,
} from "@chakra-ui/react"
import { usePropertyContext } from "../hooks/propertyContext"

export default function PropertySortModal({ isOpen, onClose }) {
  const price = [
    1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000,
    9000000,
  ]
  const emiPrice = [
    10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
  ]
  const bhk = [1, 2, 3, 4, 5]
  const baths = [1, 2, 3, 4, 5]
  const { filterObject, setFilterObject } = usePropertyContext()
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="sm"
      variant="dark"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sort Properties</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack rowGap={4}>
            <Select
              placeholder="Property type"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.propertyType}
              onChange={(e) =>
                setFilterObject({
                  ...filterObject,
                  propertyType: e.target.value,
                })
              }
            >
              <option value="house">House</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </Select>
            <Select
              placeholder="Min: Price"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.minPrice}
              onChange={(e) => {
                setFilterObject({ ...filterObject, minPrice: e.target.value })
              }}
            >
              <option value="0">{`<1000000`}</option>
              {price.map((p, index) => {
                if (
                  filterObject.maxPrice &&
                  p >= parseInt(filterObject.maxPrice)
                ) {
                  return null
                }
                return (
                  <option key={`${p}${index}min`} value={p.toString()}>
                    {p}
                  </option>
                )
              })}
            </Select>
            <Select
              placeholder="Max: Price"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.maxPrice}
              onChange={(e) =>
                setFilterObject({ ...filterObject, maxPrice: e.target.value })
              }
            >
              {price.map((p, index) => {
                if (
                  filterObject.minPrice &&
                  p <= parseInt(filterObject.minPrice)
                ) {
                  return null
                }
                return (
                  <option key={`${p}${index}max`} value={p.toString()}>
                    {p}
                  </option>
                )
              })}
              <option value="10000000">{`>9000000`}</option>
            </Select>
            <Select
              placeholder="BHK"
              value={filterObject.bhk}
              onChange={(e) =>
                setFilterObject({ ...filterObject, bhk: e.target.value })
              }
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
            >
              {bhk.map((val, index) => (
                <option key={val + index} value={val}>
                  {val}
                </option>
              ))}
            </Select>
            <Select
              placeholder="Furnished Type"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.furnishType}
              onChange={(e) =>
                setFilterObject({
                  ...filterObject,
                  furnishType: e.target.value,
                })
              }
            >
              <option value="fullfurnished">Full-Furnished</option>
              <option value="semifurnished">Semi-Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </Select>
            <Select
              placeholder="Select Facing"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.facing}
              onChange={(e) =>
                setFilterObject({
                  ...filterObject,
                  facing: e.target.value,
                })
              }
            >
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
              <option value="northeast">North-East</option>
              <option value="northwest">North-West</option>
              <option value="southwest">South-West</option>
              <option value="southeast">South-East</option>
            </Select>
            <Select
              placeholder="Min: EMI/month"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.minEmiPrice}
              onChange={(e) => {
                setFilterObject({
                  ...filterObject,
                  minEmiPrice: e.target.value,
                })
              }}
            >
              <option value="0">{`<10000`}</option>
              {emiPrice.map((p, index) => {
                if (
                  filterObject.maxEmiPrice &&
                  p >= parseInt(filterObject.maxEmiPrice)
                ) {
                  return null
                }
                return (
                  <option key={`${p}${index}min`} value={p.toString()}>
                    {p}
                  </option>
                )
              })}
            </Select>
            <Select
              placeholder="Max: EMI/month"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.maxEmiPrice}
              onChange={(e) =>
                setFilterObject({
                  ...filterObject,
                  maxEmiPrice: e.target.value,
                })
              }
            >
              {emiPrice.map((p, index) => {
                if (
                  filterObject.minEmiPrice &&
                  p <= parseInt(filterObject.minEmiPrice)
                ) {
                  return null
                }
                return (
                  <option key={`${p}${index}max`} value={p.toString()}>
                    {p}
                  </option>
                )
              })}
              <option value="100000">{`>90000`}</option>
            </Select>
            <Select
              placeholder="Current Status"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.currentStatus}
              onChange={(e) =>
                setFilterObject({
                  ...filterObject,
                  currentStatus: e.target.value,
                })
              }
            >
              <option value="readytomove">Ready To Move</option>
              <option value="underconstruction">Under Construction</option>
            </Select>
            <Select
              placeholder="Number of Bathrooms"
              variant="filled"
              bgColor="gray.700"
              color="white"
              _hover={{ bgColor: "gray.50", color: "teal.800" }}
              value={filterObject.numBath}
              onChange={(e) =>
                setFilterObject({
                  ...filterObject,
                  numBath: e.target.value,
                })
              }
            >
              {baths.map((b, index) => {
                return (
                  <option key={`${b}${index}`} value={b.toString()}>
                    {b}
                  </option>
                )
              })}
            </Select>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              setFilterObject({})
              onClose()
            }}
            colorScheme="red"
            mr={3}
          >
            Clear
          </Button>
          <Button variant="dark" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
