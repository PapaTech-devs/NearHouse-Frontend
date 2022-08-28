import {
  Flex,
  Box,
  Heading,
  Stack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/contextHooks";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { validateEmail, showToast, handleInputChange } from "../utils";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({
    email: false,
    password: false,
  });
  const { signIn } = useAuth();

  async function submitHandler() {
    const errorObject = {
      email: false,
      password: false,
    };

    // check for email
    if (!validateEmail(values.email)) {
      errorObject.email = true;
      showToast("Enter a valid email", "error", toast);
    } else {
      errorObject.email = false;
    }

    // check for password
    if (values.password.length === 0) {
      errorObject.password = true;
      showToast("Please enter a password", "error", toast);
    } else {
      errorObject.password = false;
    }

    setError(errorObject);

    if (errorObject.email || errorObject.password) {
      return;
    }

    setLoading(true);
    try {
      await signIn(values.email, values.password);
      showToast("Logged in successfully", "success", toast);
      setLoading(false);
      router.replace("/search");
    } catch (e) {
      switch (e.code) {
        case "auth/user-not-found":
          errorObject.email = true;
          showToast("User does not exists.", "error", toast);
          break;
        case "auth/wrong-password":
          errorObject.password = true;
          showToast("Wrong password for the user.", "error", toast);
          break;
        default:
          errorObject.email = true;
          showToast("Internal server error.", "error", toast);
      }
      setError(errorObject);
      setLoading(false);
    }
  }

  return (
    <Flex h="90vh" justify={"center"} align={"center"}>
      <Head>
        <title>Login Page</title>
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
            Login
          </Heading>
          <Input
            isInvalid={errors.email}
            onChange={(e) => handleInputChange(e, setValues, values)}
            placeholder="Email"
            size="md"
            name="email"
          />
          <PasswordInput
            isInvalid={errors.password}
            placeholder="Password"
            onChange={(e) => handleInputChange(e, setValues, values)}
            name="password"
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
              disabled={loading}
              onClick={() => router.push("/register")}
            >
              Create Account
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
