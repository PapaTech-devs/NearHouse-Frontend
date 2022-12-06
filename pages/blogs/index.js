import { Box, Flex, Heading, Stack } from "@chakra-ui/react"
import ArticleInfo from "../../components/blog/articleInfo"

export default function BlogList({ articles }) {
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgColor="black"
    >
      <Box width="85%">
        <Box
          d="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Heading color="white">Article List</Heading>
        </Box>
        <Box rounded="md" color="white" px="15px" py="15px">
          <Stack spacing={8}>
            {articles.map((article) => (
              <ArticleInfo
                key={article._id}
                slug={article.slug}
                title={article.title}
                description={article.description}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Flex>
  )
}

export async function getServerSideProps(context) {
  // ** Fetch data here **

  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles`
  ).then((res) => res.json())

  return {
    props: { articles }, // will be passed to the page component as props
  }
}
