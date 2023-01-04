import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AuthUserProvider } from "../hooks/contextHooks";
import { LoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { PropertyContextProvider } from "../hooks/propertyContext";
import theme from "../theme";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";

function MyApp({ Component, pageProps }) {
  const [librariesProp, _] = useState(["places"]);
  return (
    <ChakraProvider theme={theme}>
      <AuthUserProvider>
        <PropertyContextProvider>
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            libraries={librariesProp}
          >
            <Navbar />
            <Component {...pageProps} />
          </LoadScript>
        </PropertyContextProvider>
      </AuthUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
