import { Flex, Box, Heading, Stack, Input, Button } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/contextHooks";
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  async function submitHandler() {
    if (email.length > 0 && password.length > 0) {
      setLoading(true);
      await signIn(email, password);
      setLoading(false);
      router.replace("/search");
    }
  }

  return (
    <Flex h="90vh" justify={"center"} align={"center"}>
      <Head>
        <title>Login Page</title>
      </Head>
      <Box
        px={[8, 10, 10, 10]}
        py={8}
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            size="md"
          />
          <PasswordInput setValue={setPassword} placeholder="Password" />
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
