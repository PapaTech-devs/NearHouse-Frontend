import Link from "next/link"
import { Box, Heading, Text } from "@chakra-ui/react"

function ArticleInfo(props) {
  const date = new Date(props.createdAt)
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return (
    <Link href={`/blogs/${props.slug}`}>
      <Box
        p={5}
        justifyContent="space-between"
        d="flex"
        shadow="md"
        borderWidth="1px"
        border="2px solid green"
        cursor="pointer"
      >
        <Box d="flex" flexDirection="column">
          <Heading fontSize="2xl">{props.title}</Heading>
          <Text mt={4} fontSize="md">
            {props.description}
          </Text>
          <Text mt={4} fontSize="sm">
            Published at : {date.toLocaleDateString("en-US", options)}
          </Text>
        </Box>
      </Box>
    </Link>
  )
}

export default ArticleInfo
