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
      fontSize={["sm", "sm", "md", "2xl"]}
      cursor="pointer"
      _hover={{ transform: "scale(1.05)" }}
      onClick={() => {
        console.log("clicked read more");
      }}
    >
      {/* <Image w={10} h={10} src="/images/add_icon.png" alt="add property icon" /> */}
      <Text fontWeight={"semibold"} color="white">
        {props.name}
      </Text>
    </Flex>
  );
};
