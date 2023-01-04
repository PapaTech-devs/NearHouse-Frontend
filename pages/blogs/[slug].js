import { Box, Text, Image, Flex, Link } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
// import rehypeRaw from "rehype-raw";
// import unwrapImages from "remark-unwrap-images";
export default function ArticleComponent({ article }) {
  // const input = `<img>`;

  const newTheme = {
    p: (props) => {
      const { children } = props;
      return (
        <Text my={2} fontSize="18px" lineHeight="8">
          {children}
        </Text>
      );
    },
    blockquote: (props) => {
      const { children } = props;
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
      );
    },
    a: (props) => {
      return (
        <Link
          href={props.href}
          isExternal
          fontFamily={"cursive"}
          color={"#2AE027"}
        >
          {props.children}
        </Link>
      );
    },

    img: (props) => {
      const { src, alt } = props;
      return (
        <Flex justifyContent="center" alignItems="center" py={"2em"}>
          <Image
            src={src}
            alt={alt}
            h={{ md: "400px", sm: "350px", base: "300px" }}
            w={"550px"}
          />
        </Flex>
      );
    },
  };
  return (
    <Box
      bgColor="black"
      color="white"
      // px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      mb="8"
      direction={"column"}
      px={{ md: "20rem", sm: "4em", base: "1em" }}
    >
      {/* <Flex alignItems={"start"} direction={"column"}> */}
      <Image
        src={article.thumbnail}
        alt={article.title}
        h={{ md: "500px", sm: "300px", base: "200px" }}
        w={{ md: "1500px", sm: "600px", base: "400px" }}
      />
      <Head>
        <title>{article.title}</title>
      </Head>
      <ReactMarkdown
        components={ChakraUIRenderer(newTheme)}
        skipHtml
        // source={data.strapiArticle.content}
        // transformImageUri={(uri) =>
        //   uri.startsWith("http")
        //     ? uri
        //     : `${process.env.REACT_IMAGE_BASE_URL}${uri}`
        // }
      >
        {article.markdown}
      </ReactMarkdown>
      {/* </Flex> */}
    </Box>
  );
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  //  ** Fetch individual post from backend using params.slug **
  const article = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles/slugToBlog/${params.slug}`
  ).then((res) => res.json());

  // Pass data to the page via props
  return {
    props: {
      article,
    },
    revalidate: 10,
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts

  const slugLists = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles/slugList`
  ).then((res) => res.json());

  const slugs = slugLists.map((path) => ({
    params: { slug: path },
  }));
  return { paths: slugs, fallback: true };
}
