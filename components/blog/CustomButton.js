import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
export const CustomButton = (props) => {
  return (
    <Flex
      backgroundImage="url('/images/button_background.svg')"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      alignSelf="flex-start"
      h={["25px", "25px", "25px", "45px"]}
      w={["90px", "90px", "90px", "150px"]}
      justifyContent="center"
      alignItems="center"
      gap={4}
      fontSize={["md", "sm", "md", "2xl"]}
      cursor="pointer"
      onClick={() => {
        console.log("clicked read more");
      }}
    >
      {/* <Image w={10} h={10} src="/images/add_icon.png" alt="add property icon" /> */}
      <Text fontWeight="bold" color="white">
        {props.name}
      </Text>
    </Flex>
  );
};
