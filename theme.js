import { extendTheme } from "@chakra-ui/react"

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({
  components: {
    Button: {
      variants: {
        dark: {
          bg: "gray.700",
          color: "white",
          fontWeight: "semibold",
        },
      },
    },
    Text: {
      variants: {
        dark: {
          color: "white",
        },
      },
    },
    Modal: {
      parts: ["content"],
      variants: {
        dark: {
          dialog: {
            bg: "gray.900",
            color: "white",
          },
        },
      },
    },
  },
})

export default theme
