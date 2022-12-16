import { Box, Text } from "@chakra-ui/react"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"
import Head from "next/head"

export default function ArticleComponent({ article }) {
  const newTheme = {
    p: (props) => {
      const { children } = props
      return (
        <Text my={2} fontSize="18px" lineHeight="8">
          {children}
        </Text>
      )
    },
    blockquote: (props) => {
      const { children } = props
      return (
        <Box
          bgColor="gray.900"
          fontSize="18px"
          fontStyle="italic"
          p={4}
          borderLeft="4px"
          borderColor="gray.500"
          my={5}
          color="whiteAlpha.800"
        >
          {children}
        </Box>
      )
    },
  }
  return (
    <Box
      bgColor="black"
      color="white"
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      mt="-4"
      mb="8"
    >
      <Head>
        <title>{article.title}</title>
      </Head>
      <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
        {article.markdown}
      </ReactMarkdown>
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
  return { paths: slugs, fallback: true }
}
