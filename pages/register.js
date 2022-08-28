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
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../hooks/contextHooks";
import { AiFillPhone } from "react-icons/ai";
import {
  handleInputChange,
  showToast,
  validateEmail,
  validatePhoneNumber,
} from "../utils";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
    email: false,
    name: false,
    phoneNumber: false,
  });
  const { createUser } = useAuth();
  const [loading, setLoading] = useState(false);

  async function submitHandler() {
    const errorObject = {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
      phoneNumber: false,
    };

    // check for email
    if (!validateEmail(values.email)) {
      showToast("Enter a valid email", "error", toast);
      errorObject.email = true;
    } else {
      errorObject.email = false;
    }

    // check for full name
    if (values.name.length <= 6) {
      errorObject.name = true;
      showToast("Please enter your full name", "error", toast);
    } else {
      errorObject.name = false;
    }

    // check for mobile number
    if (!validatePhoneNumber(values.phoneNumber)) {
      errorObject.phoneNumber = true;
      showToast("Please enter a valid mobile number", "error", toast);
    } else {
      errorObject.phoneNumber = false;
    }

    // check for password
    if (values.password.length <= 6) {
      errorObject.password = true;
      showToast("Please enter a password of length 7 or more", "error", toast);
    } else {
      errorObject.password = false;
    }

    // check for confirm password
    if (values.confirmPassword.length === 0) {
      errorObject.confirmPassword = true;
      showToast("Please enter your password again", "error", toast);
    } else if (values.confirmPassword !== values.password) {
      errorObject.confirmPassword = true;
      showToast("Passwords doesn't match", "error", toast);
    } else {
      errorObject.confirmPassword = false;
    }

    setErrors(errorObject);
    if (
      errorObject.email ||
      errorObject.confirmPassword ||
      errorObject.name ||
      errorObject.phoneNumber ||
      errorObject.password
    ) {
      return;
    }

    setLoading(true);
    try {
      const userid = await createUser(values.email, values.password);
      values.userid = userid;
      // store user here
      showToast(`Account created for ${values.name}`, "success", toast);
      setLoading(false);
      router.replace("/search");
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          errorObject.email = true;
          showToast("User with this email already exists.", "error", toast);
          break;
        case "auth/weak-password":
          errorObject.password = true;
          showToast("Try a stronger password.", "error", toast);
          break;
        default:
          errorObject.email = true;
          showToast("Internal server error.", "error", toast);
      }
      setErrors(errorObject);
      setLoading(false);
    }
  }

  return (
    <Flex h="90vh" justify={"center"} align={"center"}>
      <Head>
        <title>Register Page</title>
      </Head>
      <Box
        px={[6, 10, 10, 10]}
        py={6}
        w={["20rem", "24rem", "24rem", "24rem"]}
        border="1px"
        borderColor="gray.200"
        borderRadius="2%"
        boxShadow="base"
      >
        <Stack spacing={5}>
          <Heading textAlign="center" size="lg">
            Create Account
          </Heading>
          <Input
            placeholder="Full name"
            size="md"
            name="name"
            isInvalid={errors.name}
            onChange={(e) => handleInputChange(e, setValues, values)}
          />
          <Input
            placeholder="Email"
            size="md"
            isInvalid={errors.email}
            name="email"
            onChange={(e) => handleInputChange(e, setValues, values)}
          />
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AiFillPhone />
            </InputLeftElement>
            <Input
              isInvalid={errors.phoneNumber}
              name="phoneNumber"
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
  );
}
