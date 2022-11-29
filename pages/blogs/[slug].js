import { articles } from "../../data";
import { Box, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import parse from "html-react-parser";

export default function ArticleComponent({ article }) {
  // return (
  //   <Box bgColor="black">
  //     <Text color="white">{article.description}</Text>
  //   </Box>
  // );

  const newTheme = {
    p: (props) => {
      const { children } = props;
      return (
        <Text mb={2} fontSize={"12px"}>
          {children}
        </Text>
      );
    },
  };
  return (
    <Box pl={2}>
      <ReactMarkdown
        components={ChakraUIRenderer(newTheme)}
        children={article.markdown}
        skipHtml
      />
    </Box>
  );

  // return <Box>{article.sanitizedHtml}</Box>;

  // return <Box>{parse(article.sanitizedHtml)}</Box>;
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  //  ** Fetch individual post from backend using params.slug **

  // Pass data to the page via props
  return {
    props: {
      article: articles.filter((article) => article.slug === params.slug)[0],
    },
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const slugs = articles.map((article) => ({
    params: { slug: article.slug },
  }));
  return { paths: slugs, fallback: false };
}
