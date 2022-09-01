import { Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ImImages } from "react-icons/im";
import PreviewList from "./PreviewList";

export default function PropertyPictures() {
  const [preview, setPreview] = useState([]);
  const [files, setFiles] = useState([]);

  function handleFilesUpload(e) {
    let tempArr = [];
    let fileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      var url = URL.createObjectURL(file);
      tempArr.push(url);
      fileList.push(file);
    }
    tempArr = preview.concat(tempArr);
    fileList = files.concat(fileList);
    setPreview(tempArr);
    setFiles(fileList);
    e.target.value = "";
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
        >
          <ImImages size="25" /> <Text fontSize="lg">Browse Images</Text>
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
      {preview.length > 0 && (
        <PreviewList
          previewList={preview}
          files={files}
          setFiles={setFiles}
          setPreview={setPreview}
        />
      )}
    </>
  );
}
