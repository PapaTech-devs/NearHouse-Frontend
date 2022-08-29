import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import PropertySortModal from "./PropertySortModal";

export default function SelectComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  );
}
