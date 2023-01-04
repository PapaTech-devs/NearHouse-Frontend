import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Heading,
  Image,
  Text,
  Flex,
  Link,
  Center,
} from "@chakra-ui/react";
// import { useState } from "react";

export default function BlogCarousel(props) {
  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    dots: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box h={"30vh"} bgColor={"rgb(20,20,20)"}>
      <Box w={"100%"} h={"100%"} bgColor={"rgb(20,20,20)"}>
        <Slider {...settings}>
          {props.blogs.map((blog) => {
            return (
              <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                <Image
                  key={blog._id}
                  src={blog.thumbnail}
                  px={{ base: "1.5em", sm: "1em", md: "3em" }}
                  h={"300px"}
                  w={"500px"}
                  mt={{ md: "0em", sm: "1em", base: "4em" }}
                  _hover={{
                    base: { transform: "scale(1.02)" },
                    md: { transform: "scale(1.1)" },
                    sm: { transform: "scale(1.05)" },
                  }}
                />

                <Heading
                  textAlign={"center"}
                  color={"black"}
                  fontSize={{ base: "1xl", md: "3xl", sm: "2xl" }}
                  pt={"1em"}
                >
                  {blog.title}
                </Heading>
              </Link>
            );
          })}
        </Slider>
      </Box>
      <Box w={"100%"} h={"100%"} bgColor={"yellow"}>
        {/* <Heading textAlign={"center"} color={"black"}>
          {"Featrured articles"}
        </Heading> */}
      </Box>
    </Box>
  );
}
