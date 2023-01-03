import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Heading, Image, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function BlogCarousel(props) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <Box h={"30vh"} bgColor={"rgb(20,20,20)"}>
      <Slider {...settings}>
        {props.blogs.map((blog) => {
          return (
            <Image
              key={blog._id}
              src={blog.thumbnail}
              px={"3em"}
              h={"300px"}
              mt={"-10em"}
            />
          );
        })}
      </Slider>
      <Box w={"100%"} h={"100%"} bgColor={"yellow"}>
        <Heading textAlign={"center"} color={"black"}>
          {"BlogTitle"}
        </Heading>
      </Box>
    </Box>
  );
}
