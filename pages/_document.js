import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from "../theme"

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" style={{ backgroundColor: "black", color: "#ffffff" }}>
        <Head />
        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
