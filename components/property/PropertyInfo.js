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
import { usePropertyContext } from "../../hooks/propertyContext"

export default function PropertyInfo({ error, values, setValues }) {
  const { regions } = usePropertyContext()

  return (
    <Stack w="100%" rowGap={1}>
      <Text fontSize="sm" fontStyle="italic" marginBottom={1}>
        * are required fields
      </Text>
      <Input
        placeholder="*Enter property title"
        size="md"
        name="title"
        isInvalid={error.title}
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Textarea
        placeholder="*Enter property description"
        name="description"
        size="md"
        isInvalid={error.description}
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
        placeholder="*Enter property address"
        size="md"
        name="address"
        isInvalid={error.address}
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Select
        onChange={(e) => handleInputChange(e, setValues, values)}
        placeholder="*Select region"
        isInvalid={error.region}
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
        placeholder="*Select property type"
        name="propertyType"
        isInvalid={error.propertyType}
      >
        <option value="house">House</option>
        <option value="flat">Flat</option>
        <option value="plot">Plot (Land)</option>
      </Select>
      <Stack direction="row">
        <Input
          onChange={(e) => handleInputChange(e, setValues, values)}
          type="number"
          placeholder="*Enter area"
          size="md"
          isInvalid={error.area}
          name="area"
        />
        <Select
          onChange={(e) => handleInputChange(e, setValues, values)}
          placeholder="*Area metric"
          name="areaType"
          isInvalid={error.areaType}
        >
          <option value="sqfeet">Sq. Feet</option>
          <option value="katha">Katha</option>
          <option value="decimal">Decimal</option>
        </Select>
      </Stack>
      <Select
        onChange={(e) => handleInputChange(e, setValues, values)}
        placeholder="*Select facing"
        name="facing"
        isInvalid={error.facing}
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
        <HouseInfo error={error} values={values} setValues={setValues} />
      )}
      {values.propertyType === "flat" && (
        <FlatInfo error={error} values={values} setValues={setValues} />
      )}
      {values.propertyType === "plot" && (
        <Select
          placeholder="*Type of land"
          name="landType"
          isInvalid={error.landType}
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
          placeholder="*Price of the property"
          name="price"
          isInvalid={error.price}
        />
        <Select
          onChange={(e) => handleInputChange(e, setValues, values)}
          placeholder="*Price type"
          name="priceType"
          isInvalid={error.priceType}
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
