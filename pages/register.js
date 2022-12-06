import {
  Flex,
  Box,
  Heading,
  Stack,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  useToast,
  HStack,
  Divider,
  Text,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import PasswordInput from "../components/PasswordInput"
import { useAuth } from "../hooks/contextHooks"
import { AiFillPhone } from "react-icons/ai"
import { GrGoogle } from "react-icons/gr"
import {
  handleInputChange,
  showToast,
  storeUser,
  validateEmail,
  validatePhoneNumber,
} from "../utils"

export default function RegisterPage() {
  const router = useRouter()
  const toast = useToast()
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    fullName: "",
    mobile: "",
  })
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
    email: false,
    fullName: false,
    mobile: false,
  })
  const { createUser, setAuthUser, signInWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)

  async function submitHandler() {
    const errorObject = {
      fullName: false,
      email: false,
      password: false,
      confirmPassword: false,
      mobile: false,
    }

    // check for email
    if (!validateEmail(values.email)) {
      showToast("Enter a valid email", "error", toast)
      errorObject.email = true
    } else {
      errorObject.email = false
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

    // check for password
    if (values.password.length <= 6) {
      errorObject.password = true
      showToast("Please enter a password of length 7 or more", "error", toast)
    } else {
      errorObject.password = false
    }

    // check for confirm password
    if (values.confirmPassword.length === 0) {
      errorObject.confirmPassword = true
      showToast("Please enter your password again", "error", toast)
    } else if (values.confirmPassword !== values.password) {
      errorObject.confirmPassword = true
      showToast("Passwords doesn't match", "error", toast)
    } else {
      errorObject.confirmPassword = false
    }

    setErrors(errorObject)
    if (
      errorObject.email ||
      errorObject.confirmPassword ||
      errorObject.fullName ||
      errorObject.mobile ||
      errorObject.password
    ) {
      return
    }

    setLoading(true)
    try {
      const firebaseUser = await createUser(values.email, values.password)
      values.userid = firebaseUser.user.uid
      await storeUser(values, setAuthUser)
      // store user here
      showToast(`Account created for ${values.fullName}`, "success", toast)
      setLoading(false)
      router.replace("/")
    } catch (e) {
      console.error(e)
      switch (e.code) {
        case "auth/email-already-in-use":
          errorObject.email = true
          showToast("User with this email already exists.", "error", toast)
          break
        case "auth/weak-password":
          errorObject.password = true
          showToast("Try a stronger password.", "error", toast)
          break
        default:
          errorObject.email = true
          showToast("Internal server error.", "error", toast)
      }
      setErrors(errorObject)
      setLoading(false)
    }
  }

  return (
    <Flex h="90vh" justify="center" align="center" bgColor="black">
      <Head>
        <title>Register Page</title>
      </Head>
      <Box
        px={[6, 10, 10, 10]}
        py={10}
        w={["20rem", "24rem", "24rem", "24rem"]}
        border="1px"
        borderColor="gray.700"
        borderRadius="2%"
        boxShadow="base"
        bgColor="gray.800"
        color="white"
      >
        <Stack spacing={5}>
          <Heading textAlign="center" size="lg">
            Create Account
          </Heading>
          <Input
            placeholder="Full name"
            size="md"
            name="fullName"
            _placeholder={{ color: "gray.400" }}
            border="none"
            bgColor="gray.700"
            color="white"
            isInvalid={errors.name}
            onChange={(e) => handleInputChange(e, setValues, values)}
          />
          <Input
            placeholder="Email"
            size="md"
            isInvalid={errors.email}
            name="email"
            _placeholder={{ color: "gray.400" }}
            border="none"
            bgColor="gray.700"
            color="white"
            onChange={(e) => handleInputChange(e, setValues, values)}
          />
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AiFillPhone />
            </InputLeftElement>
            <Input
              isInvalid={errors.mobile}
              name="mobile"
              _placeholder={{ color: "gray.400" }}
              border="none"
              bgColor="gray.700"
              color="white"
              onChange={(e) => handleInputChange(e, setValues, values)}
              type="tel"
              placeholder="Phone number"
            />
          </InputGroup>
          <PasswordInput
            isInvalid={errors.password}
            name="password"
            onChange={(e) => handleInputChange(e, setValues, values)}
            placeholder="Password"
          />
          <PasswordInput
            onChange={(e) => handleInputChange(e, setValues, values)}
            placeholder="Confirm Password"
            name="confirmPassword"
            isInvalid={errors.confirmPassword}
          />
          <HStack>
            <Divider />
            <Text color="gray.500">or</Text>
            <Divider />
          </HStack>
          <Button
            isLoading={loading}
            onClick={async () => {
              try {
                setLoading(true)
                const user = await signInWithGoogle()
                const data = await fetch(
                  `/backend/user/checkEmail/${user.email}`
                ).then((res) => res.json())
                // check if user already exists
                // if yes then dont store user data
                if (data == false) {
                  let tempUser = {}
                  tempUser.userid = user.uid
                  tempUser.email = user.email
                  tempUser.fullName = user.displayName
                  tempUser.mobile = user.phoneNumber
                  await storeUser(tempUser, setAuthUser)
                  showToast(
                    `Accounted created for ${user.email}`,
                    "success",
                    toast
                  )
                } else {
                  showToast(`Logged in as ${user.email}`, "success", toast)
                }
                setLoading(false)
                router.replace("/")
              } catch (e) {
                showToast("Something went wrong.", "error", toast)
                console.error(e.message)
                setLoading(false)
              }
            }}
            fontSize="md"
            color="black"
            rightIcon={<GrGoogle />}
          >
            Register with Google
          </Button>
          <Stack direction="row" justify="space-between">
            <Button
              colorScheme="green"
              mw="40%"
              isLoading={loading}
              onClick={submitHandler}
            >
              Submit
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => router.push("/login")}
              disabled={loading}
            >
              Already have account?
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  )
}
