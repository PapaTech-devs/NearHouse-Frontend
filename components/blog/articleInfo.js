import Link from "next/link";
import { Box, Heading, Text } from "@chakra-ui/react";

function ArticleInfo(props) {
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
          <Heading fontSize="xl">{props.title}</Heading>
          <Text mt={4}>{props.description}</Text>
        </Box>
      </Box>
    </Link>
  );
}

export default ArticleInfo;
