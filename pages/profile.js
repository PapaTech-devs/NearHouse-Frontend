import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useAuth } from "../hooks/contextHooks"
import { FaUserAlt } from "react-icons/fa"
import { BsFillTelephoneFill } from "react-icons/bs"
import { AiFillMail, AiFillHome } from "react-icons/ai"
import Head from "next/head"
import { useState } from "react"
import { handleInputChange, updateUser, validatePhoneNumber } from "../utils"

export default function ProfilePage() {
  const { authUser, setAuthUser } = useAuth()
  const copyUser = JSON.parse(JSON.stringify(authUser))
  const [userData, setUserData] = useState(copyUser)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    fullName: false,
    mobile: false,
  })

  // Add profile page update functionality

  async function handleUpdate() {
    const cmp = JSON.stringify(authUser) !== JSON.stringify(userData)
    if (!cmp) return

    const errorObject = {
      fullName: false,
      email: false,
      password: false,
      confirmPassword: false,
      mobile: false,
    }

    // check for full name
    if (values.fullName.length <= 6) {
      errorObject.fullName = true
      showToast("Please enter your full name", "error", toast)
    } else {
      errorObject.fullName = false
    }

    // check for mobile number
    if (!validatePhoneNumber(values.mobile)) {
      errorObject.mobile = true
      showToast("Please enter a valid mobile number", "error", toast)
    } else {
      errorObject.mobile = false
    }

    setErrors(errorObject)
    if (errorObject.fullName || errorObject.mobile) {
      return
    }

    setLoading(true)
    await updateUser(userData, setAuthUser)
    setLoading(true)
  }

  if (!authUser) return <></>
  return (
    <Flex
      h="90vh"
      bgColor="black"
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      direction="column"
      gap={4}
      color="white"
    >
      <Head>
        <title>Profile Page</title>
      </Head>
      <Text fontSize="2xl" fontWeight="bold">
        Account Details
      </Text>
      <Stack rowGap={2}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaUserAlt />
          </InputLeftElement>
          <Input
            placeholder="Enter your name (required)"
            _placeholder={{ color: "gray.500" }}
            name="userName"
            defaultValue={authUser.fullName ?? ""}
            onChange={(e) => handleInputChange(e, setUserData, userData)}
            //   isInvalid={error.userName}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BsFillTelephoneFill />
          </InputLeftElement>
          <Input
            placeholder="Enter your phone number (required)"
            _placeholder={{ color: "gray.500" }}
            type="tel"
            name="mobile"
            defaultValue={authUser.mobile ?? ""}
            //   isInvalid={error.userMobileNo}
            onChange={(e) => handleInputChange(e, setUserData, userData)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiFillMail />
          </InputLeftElement>
          <Input
            placeholder="Enter your email"
            _placeholder={{ color: "gray.500" }}
            type="email"
            name="email"
            value={authUser.email ?? ""}
            readOnly={true}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiFillHome />
          </InputLeftElement>
          <Input
            placeholder="Enter the address (optional)"
            _placeholder={{ color: "gray.500" }}
            name="address"
            defaultValue={authUser.address ?? ""}
            //   isInvalid={error.appointmentDate}
            onChange={(e) => handleInputChange(e, setUserData, userData)}
          />
        </InputGroup>
      </Stack>
      <Flex justifyContent="flex-end">
        <Button isLoading={loading} onClick={handleUpdate} colorScheme="green">
          Save
        </Button>
      </Flex>
    </Flex>
  )
}
