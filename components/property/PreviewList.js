import { Grid, IconButton, Box, Image } from "@chakra-ui/react"
import { GrClose } from "react-icons/gr"

export default function PreviewList({ values, setValues }) {
  function removeImg(index) {
    let newPreview = [...values.preview]
    let newFiles = [...values.files]
    newPreview.splice(index, 1)
    newFiles.splice(index, 1)
    setValues({ ...values, preview: newPreview, files: newFiles })
  }

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
      gap="3"
      mt="4"
    >
      {values.preview.map((url, index) => (
        <Box key={index} position="relative">
          <IconButton
            position="absolute"
            right="10px"
            top="10px"
            size="sm"
            onClick={() => removeImg(index)}
            icon={<GrClose />}
          />
          <Image
            alt="Preview image"
            width="100%"
            height="fit-content"
            src={url}
          />
        </Box>
        // add titles as alt tags
      ))}
    </Grid>
  )
}
