import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/contextHooks";
import { FaUserAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillMail, AiFillHome } from "react-icons/ai";

export default function ProfilePage() {
  const { authUser } = useAuth();

  return (
    <Flex
      h="90vh"
      bgColor="black"
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      direction="column"
      gap={4}
    >
      <title>Profile Page</title>
      <Text fontSize="2xl" fontWeight="bold">
        Account Details
      </Text>
      <Stack rowGap={2}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaUserAlt />
          </InputLeftElement>
          <Input
            placeholder="Enter your name"
            _placeholder={{ color: "gray.500" }}
            name="userName"
            defaultValue={authUser.fullName ?? ""}
            //   onChange={(e) => handleInputChange(e, setValues, values)}
            //   isInvalid={error.userName}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BsFillTelephoneFill />
          </InputLeftElement>
          <Input
            placeholder="Enter your phone number"
            _placeholder={{ color: "gray.500" }}
            type="tel"
            name="userMobileNo"
            value={authUser.mobile ?? ""}
            //   isInvalid={error.userMobileNo}
            //   onChange={(e) => handleInputChange(e, setValues, values)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiFillMail />
          </InputLeftElement>
          <Input
            placeholder="Enter your email"
            _placeholder={{ color: "gray.500" }}
            type="email"
            name="userEmail"
            value={authUser.email ?? ""}
            //   isInvalid={error.userEmail}
            //   onChange={(e) => handleInputChange(e, setValues, values)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AiFillHome />
          </InputLeftElement>
          <Input
            placeholder="Enter the address (optional)"
            _placeholder={{ color: "gray.500" }}
            name="address"
            value={authUser.address ?? ""}
            //   isInvalid={error.appointmentDate}
            //   onChange={(e) => handleInputChange(e, setValues, values)}
          />
        </InputGroup>
      </Stack>
      <Flex justifyContent="flex-end">
        <Button colorScheme="green">Save</Button>
      </Flex>
    </Flex>
  );
}
