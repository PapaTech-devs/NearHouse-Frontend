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
} from "@chakra-ui/react";

export default function PropertySortModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sort Properties</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack rowGap={4}>
            <Select placeholder="Type: House" variant="filled" color="gray.500">
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
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3}>
            Sort
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
