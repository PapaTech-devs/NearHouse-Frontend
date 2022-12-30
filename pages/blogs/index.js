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

const zoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
`;

export default function BlogList({ articles }) {
  const animation = `${zoom} 1 0.1s forwards`;

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
            src="data:image/jpeg;base64,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"
            alt="REITs"
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
                12th November 2022
              </Text>
              <Heading
                fontSize={{ base: "2xl", md: "5xl", sm: "4xl" }}
                color={"white"}
                pr={{ base: "0em", sm: "0em" }}
                _hover={{ animation: animation }}
              >
                Get to know all about Real Estate investments Trusts in India
                <br />
                (REITS)
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
            <BlogCard
              title={"Why Home loans are better than any other loan ? "}
            />
            <BlogCard
              title={"The best places to invest in residential properties ?  "}
            />
            {/* <BlogCard title={"What are the KPIs for a good construction ?  "} /> */}
            <BlogCard
              title={
                "Get to know all about Real Estate investments Trusts in India "
              }
            />
          </Stack>
          <Button
            my={20}
            bgColor={"rgb(48, 169, 255)"}
            color={"white"}
            size={"lg"}
            borderRadius={"3xl"}
          >
            {"More >"} */}
          </Button>
          {/* <CustomButton name={"More >"} /> */}
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  // ** Fetch data here **

  const articles = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend/articles`
  ).then((res) => res.json());

  return {
    props: { articles }, // will be passed to the page component as props
  };
}
