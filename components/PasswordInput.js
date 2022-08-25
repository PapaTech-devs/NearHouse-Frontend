import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";

export default function PasswordInput({ setValue, placeholder }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          size="sm"
          onClick={handleClick}
          icon={show ? <BiShow /> : <BiHide />}
        />
      </InputRightElement>
    </InputGroup>
  );
}
