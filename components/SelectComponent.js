import {
  Box,
  Flex,
  IconButton,
  Select,
  Show,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { CgMoreO } from "react-icons/cg"
import { usePropertyContext } from "../hooks/propertyContext"
import MoreFilterComponents from "./MoreFilterComponents"
import PropertySortModal from "./PropertySortModal"
import { default as ReactSelect } from "react-select"
import { showToast } from "../utils"

export default function SelectComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const price = [
    1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 8000000,
    9000000,
  ]
  const bhk = [1, 2, 3, 4, 5]
  const { filterObject, setFilterObject, regions, fetchProperties } =
    usePropertyContext()

  return (
    <Flex gap="3" pb="5" alignItems="center">
      <Box w="full" h="full" color="white">
        {regions.length !== 0 && (
          <ReactSelect
            styles={{
              control: (provided, _) => ({
                ...provided,
                border: "none",
                backgroundColor: "#2D3748",
              }),
              option: (provided, state) => ({
                ...provided,
                color: state.isSelected ? "white" : "black",
              }),
              dropdownIndicator: (provided, _) => ({
                ...provided,
                backgroundColor: "#2D3748",
                color: "#ffffff",
                borderRadius: "5rem",
              }),
              indicatorSeparator: (provided, _) => ({
                ...provided,
                backgroundColor: "#2D3748",
              }),
              indicatorsContainer: (provided, _) => ({
                ...provided,
                backgroundColor: "#2D3748",
              }),
              placeholder: (provided, _) => ({
                ...provided,
                color: "#ffffff",
              }),
              singleValue: (provided, _) => ({
                ...provided,
                color: "#ffffff",
              }),
            }}
            isSearchable={true}
            isClearable={true}
            onChange={(data) => {
              if (data)
                fetchProperties(data.value, () =>
                  showToast(
                    "No properties found in this region",
                    "error",
                    toast
                  )
                )
            }}
            options={regions.map((region) => ({
              value: region,
              label: region,
            }))}
          />
        )}
      </Box>
      <Show above="md">
        <Select
          placeholder="Property type"
          variant="filled"
          bgColor="gray.700"
          color="white"
          _hover={{ bgColor: "gray.50", color: "teal.800" }}
          value={filterObject.propertyType}
          onChange={(e) =>
            setFilterObject({ ...filterObject, propertyType: e.target.value })
          }
        >
          <option value="house">House</option>
          <option value="flat">Flat</option>
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
          variant="dark"
          bgColor="gray.700"
          color="white"
          _hover={{ bgColor: "gray.50", color: "teal.800" }}
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
        <IconButton
          colorScheme="gray"
          aria-label="More options"
          icon={<CgMoreO />}
          onClick={onOpen}
          bgColor="gray.700"
          color="white"
          _hover={{ bgColor: "gray.50", color: "teal.800" }}
        />
        <MoreFilterComponents isOpen={isOpen} onClose={onClose} />
      </Show>
      <Show below="md">
        <IconButton
          colorScheme="gray"
          aria-label="More options"
          icon={<CgMoreO />}
          onClick={onOpen}
          bgColor="gray.700"
          color="white"
          _hover={{ bgColor: "gray.50", color: "teal.800" }}
        />
        <PropertySortModal isOpen={isOpen} onClose={onClose} />
      </Show>
    </Flex>
  )
}
