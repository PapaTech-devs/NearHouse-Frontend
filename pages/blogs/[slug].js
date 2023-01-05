import {
  Box,
  Text,
  Image,
  Flex,
  Link,
  Heading,
  HStack,
  Spacer,
  Divider,
} from "@chakra-ui/react";
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
          bgColor="rgb(20, 20, 20)"
          fontSize="18px"
          // fontStyle="italic"
          p={4}
          borderLeft="4px"
          borderColor="rgba(42, 224, 39, 0.8)"
          borderRadius={"lg"}
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
          // fontFamily={"body"}
          fontWeight={"hairline"}
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
          <Image src={src} alt={alt} h={"100%"} w={"100%"} />
        </Flex>
      );
    },
  };
  console.log(article.title);
  return (
    <Box
      bgColor="black"
      color="white"
      // px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      mb="8"
      // direction={"column"}
      px={{ lg: "25em", md: "5em", sm: "4em", base: "1em" }}
    >
      <Head>
        {" "}
        <title>{article.title}</title>
      </Head>
      {/* <Flex alignItems={"start"} direction={"column"}> */}
      <Heading
        pt={4}
        fontSize={{ lg: "5xl", md: "5xl", sm: "4xl", base: "4xl" }}
      >
        {article.title}
      </Heading>
      <Box
        bgColor="rgb(20, 20, 20)"
        fontSize="18px"
        p={4}
        borderRight="2px"
        borderBottom={"1px"}
        borderRadius={"lg"}
        borderColor="rgba(42, 224, 39, 0.8)"
        my={5}
        // color="whiteAlpha.800"
      >
        <Flex direction={"row"} alignItems={"center"}>
          <Text
            // as={"span"}
            // textAlign={"right"}
            fontSize={{ lg: "lg", md: "md", sm: "sm", base: "sm" }}
            color={"gray.500"}
            w={"70%"}
          >
            &bull;{" "}
            {new Date(article.createdAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
          <Spacer />
          <Text
            pl={2}
            fontSize={{ lg: "xl", md: "lg", sm: "md", base: "md" }}
            color={"gray.300"}
            textAlign={"right"}
          >
            {article.description}
          </Text>
        </Flex>
      </Box>
      <Image
        src={article.thumbnail}
        alt={article.title}
        h={"100%"}
        w={"100%"}
      />
      <Divider my={9} />
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
