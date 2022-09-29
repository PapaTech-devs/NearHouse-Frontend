import { Input, Select, Stack } from "@chakra-ui/react"
import { handleInputChange } from "../../utils"

export default function HouseInfo({ error, values, setValues }) {
  return (
    <>
      <Input
        onChange={(e) => handleInputChange(e, setValues, values)}
        type="number"
        placeholder="*Enter BHK"
        size="md"
        isInvalid={error.bhk}
        value={values.bhk}
        name="bhk"
      />
      <Stack direction="row">
        <Input
          type="number"
          placeholder="*Number of floors"
          name="numFloor"
          isInvalid={error.numFloor}
          value={values.numFloor}
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
        <Input
          type="number"
          placeholder="*Number of bathrooms"
          name="numBath"
          isInvalid={error.numBath}
          value={values.numBath}
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
      </Stack>
      <Select
        placeholder="*Current Status"
        name="currentStatus"
        value={values.currentStatus}
        isInvalid={error.currentStatus}
        onChange={(e) => handleInputChange(e, setValues, values)}
      >
        <option value="underconstruction">Under construction</option>
        <option value="readytomove">Ready to move</option>
      </Select>
      <Select
        placeholder="Furnished Type"
        name="furnishType"
        value={values.furnishType}
        onChange={(e) => handleInputChange(e, setValues, values)}
      >
        <option value="fullfurnished">Full-furnished</option>
        <option value="semifurnished">Semi-furnished</option>
        <option value="unfurnished">Unfurnished</option>
      </Select>
      <Stack direction="row">
        <Input
          type="number"
          value={values.numParkingDependent}
          placeholder="Dependent parking"
          name="numParkingDependent"
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
        <Input
          type="number"
          placeholder="Independent parking"
          value={values.numParkingIndependent}
          name="numParkingIndependent"
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
      </Stack>
      <Input
        type="number"
        placeholder="No of balcony"
        name="numBalcony"
        value={values.numBalcony}
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
    </>
  )
}
