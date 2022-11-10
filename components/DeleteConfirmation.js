import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export default function PropertyDeleteConfirmation({
  handler,
  onClose,
  isOpen,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Do you want to delete this property?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>This action is irreversible, so think twice.</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            onClick={() => {
              onClose();
              handler();
            }}
            mr={3}
          >
            Delete
          </Button>
          <Button colorScheme="whatsapp" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
