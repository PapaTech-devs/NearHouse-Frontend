import { Box, Text } from "@chakra-ui/react"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"

export default function ArticleComponent({ article }) {
  const newTheme = {
    p: (props) => {
      const { children } = props
      return (
        <Text mb={2} fontSize={"12px"}>
          {children}
        </Text>
      )
    },
  }
  return (
    <Box pl={2}>
      <ReactMarkdown
        components={ChakraUIRenderer(newTheme)}
        children={article.markdown}
        skipHtml
      />
    </Box>
  )
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  //  ** Fetch individual post from backend using params.slug **
  const article = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles/slugToBlog/${params.slug}`
  ).then((res) => res.json())

  // Pass data to the page via props
  return {
    props: {
      article,
    },
  }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts

  const slugLists = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles/slugList`
  ).then((res) => res.json())

  const slugs = slugLists.map((path) => ({
    params: { slug: path },
  }))
  return { paths: slugs, fallback: false }
}
