import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Input,
  useToast,
  Flex,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  handleInputChange,
  showToast,
  validateEmail,
  validatePhoneNumber,
  storeAppointment,
} from "../utils"
import { v4 as uuidV4 } from "uuid"

export default function PropertyAppointmentModal({
  values,
  setValues,
  isOpen,
  onClose,
  propertyid,
}) {
  const [error, setError] = useState({
    userName: false,
    userEmail: false,
    userMobileNo: false,
    appointmentDate: false,
  })
  const toast = useToast()

  async function handleSubmit() {
    const errorObject = {
      userName: false,
      userEmail: false,
      userMobileNo: false,
      appointmentDate: false,
    }

    // check for email
    if (!validateEmail(values.userEmail)) {
      showToast("Enter a valid email", "error", toast)
      errorObject.userEmail = true
    } else {
      errorObject.userEmail = false
    }

    // check for full name
    if (values.userName.length <= 6) {
      errorObject.userName = true
      showToast("Please enter your full name", "error", toast)
    } else {
      errorObject.userName = false
    }

    // check for mobile number
    if (!validatePhoneNumber(values.userMobileNo)) {
      errorObject.userMobileNo = true
      showToast("Please enter a valid mobile number", "error", toast)
    } else {
      errorObject.userMobileNo = false
    }

    // check for date
    if (values.appointmentDate.length === 0) {
      errorObject.appointmentDate = true
      showToast("Please give a date of visit", "error", toast)
    } else {
      errorObject.appointmentDate = false
    }

    setError(errorObject)
    if (
      errorObject.userEmail ||
      errorObject.appointmentDate ||
      errorObject.userName ||
      errorObject.userMobileNo
    ) {
      return
    }
    let data = {}
    data.fullname = values.userName
    data.email = values.userEmail
    data.mobile = values.userMobileNo
    data.appointmentDate = values.appointmentDate
    data.propertyid = propertyid
    data.appointmentid = uuidV4()
    await storeAppointment(data)
    showToast(
      "Appointment booked. We will reach you shortly. Thank you.",
      "success",
      toast
    )
    onClose()
  }

  return (
    <Modal
      variant="dark"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request a callback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack rowGap={2}>
            <Input
              placeholder="Enter your name"
              _placeholder={{ color: "gray.500" }}
              name="userName"
              onChange={(e) => handleInputChange(e, setValues, values)}
              isInvalid={error.userName}
            />
            <Input
              placeholder="Enter your phone number"
              _placeholder={{ color: "gray.500" }}
              type="tel"
              name="userMobileNo"
              isInvalid={error.userMobileNo}
              onChange={(e) => handleInputChange(e, setValues, values)}
            />
            <Input
              placeholder="Enter your email"
              _placeholder={{ color: "gray.500" }}
              type="email"
              name="userEmail"
              isInvalid={error.userEmail}
              onChange={(e) => handleInputChange(e, setValues, values)}
            />
            <Flex direction="column" gap={4}>
              <label htmlFor="appointmentDate">
                Preffered Date & Time for Callback
              </label>
              <Input
                placeholder="Enter the date of your visit"
                type="datetime-local"
                name="appointmentDate"
                isInvalid={error.appointmentDate}
                onChange={(e) => handleInputChange(e, setValues, values)}
              />
            </Flex>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="green" mr={3}>
            Submit
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              setError({
                userName: false,
                userEmail: false,
                userMobileNo: false,
                appointmentDate: false,
              })
              setValues({
                userName: "",
                userEmail: "",
                userMobileNo: "",
                appointmentDate: "",
              })
              onClose()
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
