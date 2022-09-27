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

export default function MoreFilterComponents({ isOpen, onClose }) {
  const { filterObject, setFilterObject } = usePropertyContext()
  const emiPrice = [
    10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
  ]
  const baths = [1, 2, 3, 4, 5]
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>More Options</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack rowGap={4}>
            <Select
              placeholder="Furnished Type"
              variant="filled"
              color="gray.500"
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
              color="gray.500"
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
              color="gray.500"
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
              color="gray.500"
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
              <option value="10000000">{`>90000`}</option>
            </Select>
            <Select
              placeholder="Current Status"
              variant="filled"
              color="gray.500"
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
              color="gray.500"
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
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
