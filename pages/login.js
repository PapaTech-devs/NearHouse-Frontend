import {
  Flex,
  Box,
  Heading,
  Stack,
  Input,
  Button,
  useToast,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/contextHooks"
import { useState } from "react"
import PasswordInput from "../components/PasswordInput"
import { validateEmail, showToast, handleInputChange } from "../utils"
import { GrGoogle } from "react-icons/gr"

export default function LoginPage() {
  const router = useRouter()
  const toast = useToast()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setError] = useState({
    email: false,
    password: false,
  })
  const { signIn, signInWithGoogle, signMeOut } = useAuth()

  async function submitHandler() {
    const errorObject = {
      email: false,
      password: false,
    }

    // check for email
    if (!validateEmail(values.email)) {
      errorObject.email = true
      showToast("Enter a valid email", "error", toast)
    } else {
      errorObject.email = false
    }

    // check for password
    if (values.password.length === 0) {
      errorObject.password = true
      showToast("Please enter a password", "error", toast)
    } else {
      errorObject.password = false
    }

    setError(errorObject)

    if (errorObject.email || errorObject.password) {
      return
    }

    setLoading(true)
    try {
      await signIn(values.email, values.password)
      showToast("Logged in successfully", "success", toast)
      setLoading(false)
      router.replace("/")
    } catch (e) {
      switch (e.code) {
        case "auth/user-not-found":
          errorObject.email = true
          showToast("User does not exists.", "error", toast)
          break
        case "auth/wrong-password":
          errorObject.password = true
          showToast("Wrong password for the user.", "error", toast)
          break
        default:
          errorObject.email = true
          showToast("Internal server error.", "error", toast)
      }
      setError(errorObject)
      setLoading(false)
    }
  }

  return (
    <Flex h="90vh" justify="center" align="center" bgColor="black">
      <Head>
        <title>Login Page</title>
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
        textAlign="center"
      >
        <Stack spacing={5}>
          <Heading textAlign="center" size="lg">
            Login
          </Heading>
          <Input
            isInvalid={errors.email}
            onChange={(e) => handleInputChange(e, setValues, values)}
            placeholder="Email"
            size="md"
            name="email"
            _placeholder={{ color: "gray.400" }}
            border="none"
            bgColor="gray.700"
            color="white"
          />
          <PasswordInput
            isInvalid={errors.password}
            placeholder="Password"
            onChange={(e) => handleInputChange(e, setValues, values)}
            name="password"
          />
          <HStack>
            <Divider color="gray.500" />
            <Text color="gray.500">or</Text>
            <Divider color="gray.500" />
          </HStack>
          <Button
            isLoading={loading}
            onClick={async () => {
              try {
                setLoading(true)
                await signInWithGoogle()
                showToast("Logged in successfully", "success", toast)
                setLoading(false)
                router.replace("/")
              } catch (e) {
                // switch (e.code) {
                //   case "auth/user-not-found":
                //     errorObject.email = true
                //     showToast("User does not exists.", "error", toast)
                //     break
                //   case "auth/wrong-password":
                //     errorObject.password = true
                //     showToast("Wrong password for the user.", "error", toast)
                //     break
                //   default:
                //     errorObject.email = true
                //     showToast("Internal server error.", "error", toast)
                //   }
                showToast("Something went wrong.", "error", toast)
                console.error(e.code)
                setLoading(false)
              }
            }}
            fontSize="md"
            color="black"
            rightIcon={<GrGoogle />}
          >
            Sign in with Google
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
              disabled={loading}
              // onClick={() => router.push("/register")}
              onClick={() => signMeOut()}
            >
              Create Account
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  )
}
