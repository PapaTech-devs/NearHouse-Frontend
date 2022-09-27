import {
  Stack,
  Input,
  Select,
  Textarea,
  Text,
  Checkbox,
  Flex,
} from "@chakra-ui/react"
import FlatInfo from "./FlatInfo"
import HouseInfo from "./HouseInfo"
import { handleInputChange } from "../../utils"

export default function PropertyInfo({ values, setValues }) {
  const regions = ["Bolpur", "Kolkata", "Asansol"]

  return (
    <Stack w="100%" rowGap={1}>
      <Input
        placeholder="Enter property title"
        size="md"
        name="title"
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Textarea
        placeholder="Enter property description"
        name="description"
        size="md"
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Flex alignItems="center" ml={4} gap={4}>
        <Text>Are you the owner?</Text>
        <Checkbox
          onChange={(e) => setValues({ ...values, owner: e.target.checked })}
          size="md"
        />
      </Flex>
      <Input
        placeholder="Enter property address"
        size="md"
        name="address"
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Select
        onChange={(e) => handleInputChange(e, setValues, values)}
        placeholder="Select region"
        name="region"
      >
        {regions.map((region, index) => (
          <option key={region + index.toString()} value={region}>
            {region}
          </option>
        ))}
      </Select>
      <Select
        onChange={(e) => handleInputChange(e, setValues, values)}
        placeholder="Select property type"
        name="propertyType"
      >
        <option value="house">House</option>
        <option value="flat">Flat</option>
        <option value="plot">Plot (Land)</option>
      </Select>
      <Stack direction="row">
        <Input
          onChange={(e) => handleInputChange(e, setValues, values)}
          type="number"
          placeholder="Enter area"
          size="md"
          name="area"
        />
        <Select
          onChange={(e) => handleInputChange(e, setValues, values)}
          placeholder="Area metric"
          name="areaType"
        >
          <option value="sqfeet">Sq. Feet</option>
          <option value="katha">Katha</option>
          <option value="decimal">Decimal</option>
        </Select>
      </Stack>
      <Select
        onChange={(e) => handleInputChange(e, setValues, values)}
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
        <HouseInfo values={values} setValues={setValues} />
      )}
      {values.propertyType === "flat" && (
        <FlatInfo values={values} setValues={setValues} />
      )}
      {values.propertyType === "plot" && (
        <Select
          placeholder="Type of land"
          name="landType"
          onChange={(e) => handleInputChange(e, setValues, values)}
        >
          <option value="krishi">Krishi</option>
          <option value="shali">Shali</option>
          <option value="bastu">Bastu</option>
        </Select>
      )}
      <Stack direction="row">
        <Input
          onChange={(e) => handleInputChange(e, setValues, values)}
          type="number"
          placeholder="Price of the property"
          name="price"
        />
        <Select
          onChange={(e) => handleInputChange(e, setValues, values)}
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
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Flex alignItems="center" ml={4} gap={4}>
        <Text>Is property verified?</Text>
        <Checkbox
          onChange={(e) => setValues({ ...values, verified: e.target.checked })}
          size="md"
        />
      </Flex>
    </Stack>
  )
}
