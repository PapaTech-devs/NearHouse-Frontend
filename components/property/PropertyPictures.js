import { Button, Flex, Input, Text } from "@chakra-ui/react"
import { ImImages } from "react-icons/im"
import PreviewList from "./PreviewList"
import imageCompression from "browser-image-compression"
import { uploadImage } from "../../utils"

export default function PropertyPictures({ values, setValues }) {
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
    const elemsToDelete = tempArr.length - 10
    if (elemsToDelete > 0) {
      tempArr.splice(tempArr.length - elemsToDelete, elemsToDelete)
      fileList.splice(fileList.length - elemsToDelete, elemsToDelete)
    }
    setValues({ ...values, preview: tempArr, files: fileList })
    e.target.value = ""
  }

  async function compressImages() {
    setLoadingText("Compressing ")
    let res = []
    for (let image of values.files) {
      const imageFile = image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      try {
        const compressedImage = await imageCompression(imageFile, options)
        res.push(compressedImage)
      } catch (error) {
        throw error
      }
    }
    return res
  }

  async function uploadImages(images) {
    let res = []
    setLoadingText("Uploading images")
    for (let image of images) {
      let link = await uploadImage(image, values.propertyid)
      res.push(link)
    }
    return res
  }

  async function handleSubmit() {
    setLoading(true)
    const compressedFiles = await compressImages()
    const links = await uploadImages(compressedFiles)
    setValues({
      ...values,
      images: links,
    })
    setLoading(false)
  }

  return (
    <>
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
              Upload upto 10 images
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
