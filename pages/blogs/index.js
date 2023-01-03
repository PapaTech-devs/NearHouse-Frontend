import {
  Box,
  Flex,
  Heading,
  Stack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
  Text,
  Divider,
  ButtonGroup,
  SimpleGrid,
  Spacer,
  VStack,
  HStack,
  Container,
  keyframes,
} from "@chakra-ui/react";
import ArticleInfo from "../../components/blog/articleInfo";
import BlogCard from "../../components/blog/BlogCard";
import { CustomButton } from "../../components/blog/CustomButton";
import Head from "next/head";
import { transform } from "framer-motion";
import BlogCarousel from "../../components/blog/BlogCarousel";

const zoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
`;

const dummyData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    thumbnal: "https://picsum.photos/300/100",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    thumbnal: "https://picsum.photos/300/100",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    thumbnal: "https://picsum.photos/300/100",
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    thumbnal: "https://picsum.photos/300/100",
  },
];

function getDate(pdate) {
  let date = new Date();
  // let month = date.getMonth();
  // let day = date.getDate();
  // let year = date.getFullYear();
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getLatest(articles, n) {
  articles = articles.sort(function compare(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA - dateB;
  });
  return articles.slice(0, n);
}

export default function BlogList(props) {
  const animation = `${zoom} 1 0.1s forwards`;
  console.log(props);
  let heroBlog = props.articles.filter((article) => {
    return article._id === props.hero[0].heroBlogId;
  });
  heroBlog = heroBlog[0];
  const latestArticles = getLatest(props.articles, 3);
  // let publishDate = new Date(heroBlog.publishDate);
  return (
    // <Flex height="90vh" flexDirection="column" bgColor="black">
    //   <Head>
    //     <title>Blogs</title>
    //   </Head>
    //   <Box height="90vh" px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}>
    //     <Heading color="white" mb={4}>
    //       All Blogs
    //     </Heading>

    //     <Card
    //       direction={{ base: "column", sm: "row" }}
    //       overflow="hidden"
    //       variant="outline"
    //     >
    //       {/* <Image
    //         objectFit="cover"
    //         maxW={{ base: "100%", sm: "200px" }}
    //         src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
    //         alt="Caffe Latte"
    //       /> */}

    //       <Stack>
    //         <CardBody>
    //           <Heading size="md">Title</Heading>

    //           <Text py="2">Title Description</Text>
    //         </CardBody>

    //         <CardFooter>
    //           <Button variant="solid" colorScheme="blue">
    //             Read more
    //           </Button>
    //         </CardFooter>
    //       </Stack>
    //     </Card>

    //     {/* <Box rounded="md" color="white" py="15px">
    //       <Stack spacing={8}>
    //         {articles.map((article) => (
    //           <ArticleInfo
    //             key={article._id}
    //             slug={article.slug}
    //             title={article.title}
    //             description={article.description}
    //             createdAt={article.createdAt}
    //           />
    //         ))}
    //       </Stack>
    //     </Box> */}
    //   </Box>
    // </Flex>
    <>
      <Divider />
      <Box
        p={{ base: "20px", md: "50px", sm: "20px" }}
        bgColor={"black"}
        // alignContent={"center"}
        boxShadow="dark-lg"
      >
        <SimpleGrid
          columns={{ base: 1, md: 2, sm: 1 }}
          spacing={{ base: 10, sm: 5 }}
          px={{ base: "0%", sm: "0%", md: "10%" }}
        >
          <Image
            // objectFit="cover"
            // maxW={{ base: "100%", sm: "200px" }}
            src={heroBlog.thumbnail}
            alt={heroBlog.title}
            h={"100%"}
            w={"100%"}
            pr={{ md: "1em", sm: "0em", base: "0em", lg: "5em" }}
          />
          <Box>
            <VStack gap={{ md: 7, sm: 3, base: 0 }} alignItems={"start"}>
              <Text
                fontSize={{ base: "8px", md: "15px", sm: "10px" }}
                color={"gray.500"}
              >
                {getDate(heroBlog.createdAt)}
              </Text>
              <Heading
                fontSize={{ base: "2xl", md: "5xl", sm: "4xl" }}
                color={"white"}
                pr={{ base: "0em", sm: "0em" }}
                _hover={{ animation: animation }}
              >
                {heroBlog.title}
              </Heading>
              <Spacer />
              {/* <Button
                bgColor={"#2AE027"}
                color={"white"}
                borderRadius={"2xl"}
                size={{ md: "lg", sm: "md", base: "sm" }}
              >
                Read more
              </Button> */}
              <CustomButton name={"Read more"} />
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
      <Box
        h={"100%"}
        bgColor={"rgb(20, 20, 20)"}
        p={{ base: ".5em", md: "4em", sm: "2em" }}
        pt={"2em"}
      >
        <Flex
          direction={"column"}
          alignItems={"flex-start"}
          mx={{ sm: "1em", md: "0em", base: "1em" }}
        >
          <Heading
            fontSize={{ md: "4xl", sm: "3xl", base: "2xl" }}
            color={"white"}
            // mx={{ sm: "1em", md: "0em", base: "0.5em" }}
          >
            Latest from us
          </Heading>
          <hr
            width={"50px"}
            color={"#2AE027"}
            style={{
              height: "2px",
              marginTop: ".3em",
            }}
          />
        </Flex>
        <Flex maxW="9xl" direction={"column"} alignItems={"center"} my={20}>
          <Stack
            direction={{ base: "column", md: "row", sm: "column" }}
            spacing={"40px"}
          >
            {/* <BlogCard
              title={"Why Home loans are better than any other loan ? "}
            /> */}
            {latestArticles.map((article) => (
              <BlogCard
                key={article._id}
                title={article.title}
                thumbnail={article.thumbnail}
                createdAt={getDate(article.createdAt)}
              />
            ))}
            {/* <BlogCard
              title={"The best places to invest in residential properties ?  "}
            />
             <BlogCard title={"What are the KPIs for a good construction ?  "} />
            <BlogCard
              title={
                "Get to know all about Real Estate investments Trusts in India "
              }
            /> */}
          </Stack>
          <Button
            my={20}
            bgColor={"rgb(48, 169, 255)"}
            color={"white"}
            size={"lg"}
            borderRadius={"3xl"}
          >
            {"More >"}
          </Button>
          {/* <CustomButton name={"More >"} /> */}
        </Flex>
      </Box>
      {/* <Flex bgColor={"yellow"}>
        <Box h={"20vh"}></Box>
      </Flex> */}
      <BlogCarousel blogs={props.farticles} />
    </>
  );
}

// export async function getServerSideProps() {
//   // ** Fetch data here **

//   const articles = await fetch(
//     `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles`
//   ).then((res) => res.json());

//   return {
//     props: { articles }, // will be passed to the page component as props
//   };

export async function getStaticProps() {
  //  ** Fetch individual post from backend using params.slug **
  const hero = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles/getHero`
  ).then((res) => res.json());

  const farticles = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles/featured`
  ).then((res) => res.json());
  // console.log("farticles", farticles);
  const article = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles`
  ).then((res) => res.json());
  // console.log("article", article);
  // console.log("hero", hero);
  // Pass data to the page via props
  return {
    props: {
      articles: article,
      hero: hero,
      farticles: farticles,
    },
    revalidate: 10,
  };
}
