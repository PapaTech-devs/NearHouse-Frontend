import { Input, Stack, Select } from "@chakra-ui/react"
import React from "react"
import { handleInputChange } from "../../utils"

export default function FlatInfo({ error, values, setValues }) {
  return (
    <>
      <Input
        onChange={(e) => handleInputChange(e, setValues, values)}
        type="number"
        placeholder="*Enter BHK"
        size="md"
        value={values.bhk}
        name="bhk"
        isInvalid={error.bhk}
      />
      <Stack direction="row">
        <Input
          type="number"
          placeholder="*Enter floor no."
          name="floorNo"
          value={values.floorNo}
          isInvalid={error.floorNo}
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
        <Input
          type="number"
          placeholder="*Number of bathrooms"
          name="numBath"
          value={values.numBath}
          isInvalid={error.numBath}
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
          placeholder="Dependent parking"
          name="numParkingDependent"
          value={values.numParkingDependent}
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
        <Input
          type="number"
          placeholder="Independent parking"
          name="numParkingIndependent"
          value={values.numParkingIndependent}
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
