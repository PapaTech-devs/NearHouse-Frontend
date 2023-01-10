import { ChakraProvider } from "@chakra-ui/react"
import "../styles/globals.css"
import Navbar from "../components/Navbar"
import { AuthUserProvider } from "../hooks/contextHooks"
import { LoadScript } from "@react-google-maps/api"
import { useState } from "react"
import { PropertyContextProvider } from "../hooks/propertyContext"
import theme from "../theme"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  const [librariesProp, _] = useState(["places"])

  let title, description, image, url
  if (pageProps.websiteType === "property") {
    title = pageProps.property.title
    description = pageProps.property.description
    image =
      pageProps.property.images.length === 0
        ? "https://www.nearhouse.in/images/dummy.png"
        : pageProps.property.images[0]
    url = `https://www.nearhouse.in/property/${pageProps.property.propertyid}`
  }

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="title" content={title ?? "Nearhouse"} />
        <meta
          name="description"
          content={description ?? "Welcome to Nearhouse"}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url ?? "https://www.nearhouse.in"} />
        <meta property="og:title" content={title ?? "Nearhouse"} />
        <meta
          property="og:description"
          content={description ?? "Welcome to Nearhouse"}
        />
        <meta
          property="og:image"
          content={image ?? "https://www.nearhouse.in/images/brand.png"}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={url ?? "https://www.nearhouse.in"}
        />
        <meta property="twitter:title" content={title ?? "Nearhouse"} />
        <meta
          property="twitter:description"
          content={description ?? "Welcome to Nearhouse"}
        />
        <meta
          property="twitter:image"
          content={image ?? "https://www.nearhouse.in/images/brand.png"}
        />
      </Head>
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
  )
}

export default MyApp
