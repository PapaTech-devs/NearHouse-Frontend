import { Flex, Box, Heading, Stack, Input, Button } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { useAuth } from "../hooks/contextHooks";

export default function RegisterPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const { createUser } = useAuth();
  const [loading, setLoading] = useState(false);

  async function submitHandler() {
    if (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    ) {
      setLoading(true);
      await createUser(email, password);
      setLoading(false);
      router.replace("/search");
    }
  }

  return (
    <Flex h="90vh" justify={"center"} align={"center"}>
      <Head>
        <title>Register Page</title>
      </Head>
      <Box
        px={10}
        py={8}
        w={["15rem", "24rem", "24rem", "24rem"]}
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
            placeholder="Email"
            size="md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput setValue={setPassword} placeholder="Password" />
          <PasswordInput
            setValue={setConfirmPassword}
            placeholder="Confirm Password"
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
