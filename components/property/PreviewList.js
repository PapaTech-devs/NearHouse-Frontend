import { Grid, IconButton, Box, Image } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";

export default function PreviewList({
  previewList,
  files,
  setPreview,
  setFiles,
}) {
  function removeImg(index) {
    let newPreview = [...previewList];
    let newFiles = [...files];
    newPreview.splice(index, 1);
    setPreview(newPreview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
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
      {previewList.map((url, index) => (
        <Box key={index} position="relative">
          <IconButton
            position="absolute"
            right="10px"
            top="10px"
            size="sm"
            onClick={() => removeImg(index)}
            icon={<GrClose />}
          />
          <Image width="100%" height="fit-content" src={url} />
        </Box>
      ))}
    </Grid>
  );
}
