import { Box, Flex, Heading, Stack } from "@chakra-ui/react"
import ArticleInfo from "../../components/blog/articleInfo"
import Head from "next/head"

export default function BlogList({ articles }) {
  return (
    <Flex height="90vh" flexDirection="column" bgColor="black">
      <Head>
        <title>Blogs</title>
      </Head>
      <Box height="90vh" px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}>
        <Heading color="white" mb={4}>
          All Blogs
        </Heading>
        <Box rounded="md" color="white" py="15px">
          <Stack spacing={8}>
            {articles.map((article) => (
              <ArticleInfo
                key={article._id}
                slug={article.slug}
                title={article.title}
                description={article.description}
                createdAt={article.createdAt}
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
