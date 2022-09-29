import {
  Box,
  Flex,
  Grid,
  IconButton,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import { ImImages } from "react-icons/im"
import { BsTrashFill } from "react-icons/bs"
import PreviewList from "./PreviewList"
import { useState } from "react"

export default function PropertyPictures({ values, setValues }) {
  const toast = useToast()
  const [deleting, setDeleting] = useState(false)
  function handleFilesUpload(e) {
    let tempArr = []
    let fileList = []
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i]
      var url = URL.createObjectURL(file)
      tempArr.push(url)
      fileList.push(file)
    }
    tempArr = tempArr.concat(values.preview)
    fileList = fileList.concat(values.files)
    const elemsToDelete = tempArr.length - (10 - values.images.length)
    if (elemsToDelete > 0) {
      tempArr.splice(tempArr.length - elemsToDelete, elemsToDelete)
      fileList.splice(fileList.length - elemsToDelete, elemsToDelete)
    }
    setValues({ ...values, preview: tempArr, files: fileList })
    e.target.value = ""
  }

  async function deleteImage(url) {
    setDeleting(true)

    const index = url.lastIndexOf("/")
    const key = values.propertyid + url.slice(index)

    const data = await fetch(`/api/deleteImage?key=${key}`).then((res) =>
      res.json()
    )

    if (data.message === "success") {
      let tempArr = [...values.images]
      tempArr.splice(tempArr.indexOf(url), 1)
      setValues({ ...values, images: tempArr })
      toast({
        title: "Success",
        description: "Image is deleted",
        status: "success",
        duration: 5500,
        isClosable: true,
      })
    }
    setDeleting(false)
  }

  return (
    <>
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap="3"
        my="4"
      >
        {values.images.map((url, index) => (
          <Box key={url + index} position="relative">
            <IconButton
              position="absolute"
              right="10px"
              top="10px"
              size="sm"
              isLoading={deleting}
              colorScheme="orange"
              icon={<BsTrashFill />}
              onClick={() => deleteImage(url)}
            />
            <Image width="100%" height="fit-content" src={url} />
          </Box>
        ))}
      </Grid>
      <label htmlFor="imageInput">
        <Flex
          border="2px"
          borderStyle="dashed"
          borderColor="gray.400"
          p="4"
          alignItems="center"
          justifyContent="center"
          gap="4"
          h="10rem"
          bg="gray.100"
          borderRadius="2px"
        >
          <ImImages size="25" color="gray" />
          <Flex direction="column">
            <Text fontSize="lg" textColor="gray.700">
              Browse Images
            </Text>
            <Text fontSize="sm" textColor="gray.500">
              Upload upto {10 - values.images.length} more images
            </Text>
          </Flex>
        </Flex>
      </label>
      <Input
        id="imageInput"
        type="file"
        multiple={true}
        display="none"
        onChange={handleFilesUpload}
        accept=".jpg,.png,.jpeg,.JPG,.PNG,.JPEG"
      />
      {values.preview.length > 0 && (
        <PreviewList values={values} setValues={setValues} />
      )}
    </>
  )
}
