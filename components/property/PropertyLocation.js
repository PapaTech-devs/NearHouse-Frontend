import { Text } from "@chakra-ui/react"
import MapWithSearchBox from "../MapWithSearchBox"

export default function PropertyLocation({ values, setValues }) {
  return (
    <>
      <Text fontSize="sm" fontStyle="italic" marginBottom={1}>
        *marker is set at your current location by default
      </Text>
      <MapWithSearchBox values={values} setValues={setValues} />
    </>
  )
  // return <p>Location</p>;
}
