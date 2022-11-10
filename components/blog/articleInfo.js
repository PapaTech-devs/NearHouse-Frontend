import { Box, Heading, Text } from "@chakra-ui/react";
function ArticleInfo(props) {
  return (
    <Box
      p={5}
      justifyContent="space-between"
      d="flex"
      shadow="md"
      borderWidth="1px"
      border="2px solid green"
      {...ArticleInfo}
    >
      <Box d="flex" flexDirection="column">
        <Heading fontSize="xl">{props.title}</Heading>
        <Text mt={4}>{props.description}</Text>
      </Box>
    </Box>
  );
}

export default ArticleInfo;
