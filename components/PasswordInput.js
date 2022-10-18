import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { BiShow, BiHide } from "react-icons/bi"
import { useState } from "react"

export default function PasswordInput({
  onChange,
  placeholder,
  isInvalid,
  name,
}) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        isInvalid={isInvalid}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        _placeholder={{ color: "gray.400" }}
        border="none"
        bgColor="gray.700"
        color="white"
      />
      <InputRightElement width="4.5rem">
        <IconButton
          size="sm"
          variant="dark"
          bg="gray.800"
          onClick={handleClick}
          icon={show ? <BiShow /> : <BiHide />}
        />
      </InputRightElement>
    </InputGroup>
  )
}
