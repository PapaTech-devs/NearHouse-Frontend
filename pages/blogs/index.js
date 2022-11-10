import { articles } from "../../data";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import ArticleInfo from "../../components/blog/articleInfo";
// This gets called on every request
//   export async function getServerSideProps() {
//     // Fetch data from external API
//     // const res = await fetch(`https://.../data`)
//     const data = articles//await res.json()

//     // Pass data to the page via props
//     return { props: { data } }
//   }

function BlogList() {
  //   const article = articles;
  //   console.log(article);
  //   const articleList = articles.map((element) => {
  //     return (
  //       <ul type="disc">
  //         <li
  //           style={{
  //             fontWeight: "bold",
  //             color: "red",
  //           }}
  //         >
  //           {element.title}
  //         </li>
  //         <li>{element.description}</li>
  //       </ul>
  //     );
  //   });
  //   return <div>{articleList}</div>;
  //   return <div>{articles}</div>;

  console.log(articles);
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width="85%">
        <Box
          d="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Heading color="white">Article List</Heading>
          {/* <Link to="/add-new-book">
            <Button paddingX="3rem">Add</Button>
          </Link> */}
        </Box>
        <Box rounded="md" color="white" px="15px" py="15px">
          <Stack spacing={8}>
            {articles.map((article) => (
              <ArticleInfo
                key={article._id}
                title={article.title}
                description={article.description}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}

export default BlogList;
