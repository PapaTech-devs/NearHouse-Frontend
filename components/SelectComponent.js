import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Show,
  useDisclosure,
} from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { usePropertyContext } from "../hooks/propertyContext"
import MoreFilterComponents from "./MoreFilterComponents"
import PropertySortModal from "./PropertySortModal"

export default function SelectComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const price = [
    1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000,
    9000000,
  ]
  const bhk = [1, 2, 3, 4, 5]
  const { filterObject, setFilterObject } = usePropertyContext()
  return (
    <Flex gap="3" pb="5">
      <InputGroup w="150%">
        <Input placeholder="Enter a city name" variant="filled" />
        <InputRightElement>
          <BsSearch color="gray" />
        </InputRightElement>
      </InputGroup>
      <Show above="md">
        <Select
          placeholder="Property type"
          variant="filled"
          color="gray.500"
          value={filterObject.propertyType}
          onChange={(e) =>
            setFilterObject({ ...filterObject, propertyType: e.target.value })
          }
        >
          <option value="house">House</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
        </Select>
        <Select
          placeholder="Min: Price"
          variant="filled"
          color="gray.500"
          value={filterObject.minPrice}
          onChange={(e) => {
            setFilterObject({ ...filterObject, minPrice: e.target.value })
          }}
        >
          <option value="0">{`<1000000`}</option>
          {price.map((p, index) => {
            if (filterObject.maxPrice && p >= parseInt(filterObject.maxPrice)) {
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
          color="gray.500"
          value={filterObject.maxPrice}
          onChange={(e) =>
            setFilterObject({ ...filterObject, maxPrice: e.target.value })
          }
        >
          {price.map((p, index) => {
            if (filterObject.minPrice && p <= parseInt(filterObject.minPrice)) {
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
          color="gray.500"
        >
          {bhk.map((val, index) => (
            <option key={val + index} value={val}>
              {val}
            </option>
          ))}
        </Select>
        <IconButton
          colorScheme="gray"
          aria-label="More options"
          icon={<CgMoreO />}
          onClick={onOpen}
        />
        <MoreFilterComponents isOpen={isOpen} onClose={onClose} />
      </Show>
      <Show below="md">
        <IconButton
          colorScheme="gray"
          aria-label="More options"
          icon={<CgMoreO />}
          onClick={onOpen}
        />
        <PropertySortModal isOpen={isOpen} onClose={onClose} />
      </Show>
    </Flex>
  )
}
