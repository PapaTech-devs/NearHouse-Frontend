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
import { useState } from "react";

export default function BlogCarousel(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
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
          slidesToScroll: 1,
          initialSlide: 2,
          afterChange: (index) => {
            // console.log("indexes", oldIndex, newIndex);
            setCurrentSlide(index);
            // console.log("currentSlide", props.blogs[index].title);
          },
        },
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   },
      // },
    ],
    afterChange: (index) => {
      // console.log("indexes", oldIndex, newIndex);
      setCurrentSlide((index + 1) % props.blogs.length);
      // console.log(
      //   "currentSlide",
      //   props.blogs[(index + 1) % props.blogs.length].title
      // );
    },
  };

  return (
    <Box h={"30vh"} bgColor={"rgb(20,20,20)"}>
      <Box w={"100%"} h={"100%"} bgColor={"rgb(20,20,20)"}>
        <Slider {...settings}>
          {props.blogs.map((blog) => {
            return (
              <Link key={blog._id} href={`/blogs/${blog.slug}`}>
                <Flex justifyContent={"center"} alignItems={"center"}>
                  <Image
                    key={blog._id}
                    src={blog.thumbnail}
                    px={{ base: "0em", sm: "0.5em", md: "3em" }}
                    h={{ md: "300px", sm: "250px", base: "250px" }}
                    w={{ md: "500px", sm: "350px", base: "350px" }}
                    mt={{ md: "0em", sm: "5em", base: "6em" }}
                    _hover={{
                      base: { transform: "scale(1.02)" },
                      md: { transform: "scale(1.1)" },
                      sm: { transform: "scale(1.05)" },
                    }}
                    // boxShadow={"0px 10px 19px 0px rgba(0,0,0,0.48)"}
                  />
                </Flex>
              </Link>
            );
          })}
        </Slider>
      </Box>
      <Box w={"100%"} h={"100%"} bgColor={"yellow"}>
        {/* <Heading textAlign={"center"} color={"black"}>
          {"Featrured articles"}
        </Heading> */}
        <Heading
          textAlign={"center"}
          color={"black"}
          bgColor={"yellow"}
          fontSize={{ base: "2xl", md: "4xl", sm: "3xl" }}
          pt={{ md: "5em", sm: "6em", base: "5em" }}
          px={{ md: "5em", sm: "3em", base: "1em" }}
        >
          {props.blogs[currentSlide].title}
        </Heading>
      </Box>
    </Box>
  );
}
