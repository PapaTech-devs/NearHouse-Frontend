import { Input, Stack, Select } from "@chakra-ui/react"
import React from "react"
import { handleInputChange } from "../../utils"

export default function FlatInfo({ values, setValues }) {
  return (
    <>
      <Input
        onChange={(e) => handleInputChange(e, setValues, values)}
        type="number"
        placeholder="Enter BHK"
        size="md"
        name="bhk"
      />
      <Stack direction="row">
        <Input
          type="number"
          placeholder="Enter floor no."
          name="floorNo"
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
        <Input
          type="number"
          placeholder="Number of bathrooms"
          name="numBath"
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
      </Stack>
      <Select
        placeholder="Current Status"
        name="currentStatus"
        onChange={(e) => handleInputChange(e, setValues, values)}
      >
        <option value="underconstruction">Under construction</option>
        <option value="readytomove">Ready to move</option>
      </Select>
      <Select
        placeholder="Furnished Type"
        name="furnishType"
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
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
        <Input
          type="number"
          placeholder="Independent parking"
          name="numParkingIndependent"
          onChange={(e) => handleInputChange(e, setValues, values)}
        />
      </Stack>
      <Input
        type="number"
        placeholder="No of balcony"
        name="numBalcony"
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
    </>
  )
}
