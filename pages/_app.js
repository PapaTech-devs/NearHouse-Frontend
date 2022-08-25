import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AuthUserProvider } from "../hooks/contextHooks";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthUserProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
