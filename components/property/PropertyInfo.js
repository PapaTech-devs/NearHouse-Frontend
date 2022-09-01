import {
  Stack,
  Input,
  Select,
  Textarea,
  Text,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import FlatInfo from "./FlatInfo";
import HouseInfo from "./HouseInfo";

export default function PropertyInfo({ values, setValues }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Stack w="100%" rowGap={1}>
      <Input
        placeholder="Enter property title"
        size="md"
        name="title"
        onChange={handleInputChange}
      />
      <Textarea
        placeholder="Enter property description"
        name="description"
        size="md"
        onChange={handleInputChange}
      />
      <Flex alignItems="center" ml={4} gap={4}>
        <Text>Are you the owner?</Text>
        <Checkbox
          onChange={(e) => setValues({ ...values, owner: e.target.checked })}
          size="md"
        />
      </Flex>
      <Select
        onChange={handleInputChange}
        placeholder="Select property type"
        name="propertyType"
      >
        <option value="house">House</option>
        <option value="flat">Flat</option>
        <option value="plot">Plot (Land)</option>
      </Select>
      <Input
        onChange={handleInputChange}
        type="number"
        placeholder="Enter BHK"
        size="md"
        name="bhk"
      />
      <Stack direction="row">
        <Input
          onChange={handleInputChange}
          type="number"
          placeholder="Enter area"
          size="md"
          name="area"
        />
        <Select
          onChange={handleInputChange}
          placeholder="Area metric"
          name="areaType"
        >
          <option value="sqfeet">Sq. Feet</option>
          <option value="katha">Katha</option>
          <option value="decimal">Decimal</option>
        </Select>
      </Stack>
      <Select
        onChange={handleInputChange}
        placeholder="Select facing"
        name="facing"
      >
        <option value="north">North</option>
        <option value="south">South</option>
        <option value="east">East</option>
        <option value="west">West</option>
        <option value="northwest">North West</option>
        <option value="northeast">North East</option>
        <option value="southeast">South East</option>
        <option value="southwest">South West</option>
      </Select>
      {values.propertyType === "house" && (
        <HouseInfo handleInputChange={handleInputChange} />
      )}
      {values.propertyType === "flat" && (
        <FlatInfo handleInputChange={handleInputChange} />
      )}
      {values.propertyType === "plot" && (
        <Select
          placeholder="Type of land"
          name="landType"
          onChange={handleInputChange}
        >
          <option value="krishi">Krishi</option>
          <option value="shali">Shali</option>
          <option value="bastu">Bastu</option>
        </Select>
      )}
      <Stack direction="row">
        <Input
          onChange={handleInputChange}
          type="number"
          placeholder="Price of the property"
          name="price"
        />
        <Select
          onChange={handleInputChange}
          placeholder="Price type"
          name="priceType"
        >
          <option value="emi">EMI</option>
          <option value="lumpsum">Lumpsum</option>
        </Select>
      </Stack>
      <Input
        placeholder="Enter video link(if any)"
        size="md"
        name="videoLink"
        onChange={handleInputChange}
      />
      <Flex alignItems="center" ml={4} gap={4}>
        <Text>Is property verified?</Text>
        <Checkbox
          onChange={(e) => setValues({ ...values, verified: e.target.checked })}
          size="md"
        />
      </Flex>
    </Stack>
  );
}
