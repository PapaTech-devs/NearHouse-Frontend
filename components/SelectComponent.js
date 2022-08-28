import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

export default function SelectComponent() {
  return (
    <Flex gap="3" pb="5">
      <InputGroup w="150%">
        <Input placeholder="Enter a city name" variant="filled" />
        <InputRightElement children={<BsSearch color="gray" />} />
      </InputGroup>
      <Select
        placeholder="Type: House"
        variant="filled"
        color="gray.500"
        onChange={(e) => console.log(e.target.value.length)}
      >
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </Select>
      <Select placeholder="Min: Price" variant="filled" color="gray.500">
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </Select>
      <Select placeholder="Max: Price" variant="filled" color="gray.500">
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </Select>
      <Select placeholder="Floor Area" variant="filled" color="gray.500">
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </Select>
      <Select placeholder="BHK" variant="filled" color="gray.500">
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </Select>
    </Flex>
  );
}
