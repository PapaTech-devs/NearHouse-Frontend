import { Input, Select, Stack } from "@chakra-ui/react";

export default function HouseInfo({ handleInputChange }) {
  return (
    <>
      <Stack direction="row">
        <Input
          type="number"
          placeholder="Number of floors"
          name="numFloor"
          onChange={handleInputChange}
        />
        <Input
          type="number"
          placeholder="Number of bathrooms"
          name="numBath"
          onChange={handleInputChange}
        />
      </Stack>
      <Select
        placeholder="Current Status"
        name="currentStatus"
        onChange={handleInputChange}
      >
        <option value="underconstruction">Under construction</option>
        <option value="readytomove">Ready to move</option>
      </Select>
      <Select
        placeholder="Furnished Type"
        name="furnishType"
        onChange={handleInputChange}
      >
        <option value="fullfurnished">Full-furnished</option>
        <option value="semifurnished">Semi-furnished</option>
        <option value="unfurnished">Unfurnished</option>
      </Select>
      <Stack direction="row">
        <Input
          type="number"
          placeholder="No of parking"
          name="numParking"
          onChange={handleInputChange}
        />
        <Select
          placeholder="Parking type"
          name="parkingType"
          onChange={handleInputChange}
        >
          <option value="dependent">Dependent</option>
          <option value="independent">Independent</option>
        </Select>
      </Stack>
      <Input
        type="number"
        placeholder="No of balcony"
        name="numBalcony"
        onChange={handleInputChange}
      />
    </>
  );
}
