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
import { useAuth } from "../../hooks/contextHooks"

export default function PropertyInfo({ error, values, setValues }) {
  const { regions } = usePropertyContext()
  const { authUser } = useAuth()

  return (
    <Stack w="100%" rowGap={1}>
      <Text fontSize="sm" fontStyle="italic" marginBottom={1}>
        * are required fields
      </Text>
      <Input
        placeholder="*Enter property title"
        size="md"
        name="title"
        _placeholder={{ color: "gray.400" }}
        border="none"
        bgColor="gray.700"
        color="white"
        isInvalid={error.title}
        value={values.title}
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Textarea
        placeholder="*Enter property description"
        name="description"
        size="md"
        _placeholder={{ color: "gray.400" }}
        border="none"
        bgColor="gray.700"
        color="white"
        isInvalid={error.description}
        value={values.description}
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      {authUser && authUser.role === "admin" && (
        <Flex alignItems="center" ml={4} gap={4}>
          <Text>Is the property featured on Landing Page?</Text>
          <Checkbox
            onChange={(e) =>
              setValues({ ...values, featured: e.target.checked })
            }
            size="md"
            defaultChecked={values.featured}
          />
        </Flex>
      )}
      <Flex alignItems="center" ml={4} gap={4}>
        <Text>Are you the owner?</Text>
        <Checkbox
          onChange={(e) => setValues({ ...values, owner: e.target.checked })}
          size="md"
          defaultChecked={values.owner}
        />
      </Flex>
      <Input
        placeholder="*Enter property address"
        size="md"
        value={values.address}
        name="address"
        _placeholder={{ color: "gray.400" }}
        border="none"
        bgColor="gray.700"
        color="white"
        isInvalid={error.address}
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Select
        onChange={(e) => handleInputChange(e, setValues, values)}
        placeholder="*Select region"
        isInvalid={error.region}
        value={values.region}
        name="region"
        variant="outline"
        bgColor="gray.700"
        border="none"
      >
        {regions.map((region, index) => (
          <option
            style={{ color: "black" }}
            key={region + index.toString()}
            value={region}
          >
            {region}
          </option>
        ))}
      </Select>
      <Select
        onChange={(e) => handleInputChange(e, setValues, values)}
        placeholder="*Select property type"
        name="propertyType"
        value={values.propertyType}
        isInvalid={error.propertyType}
        bgColor="gray.700"
        border="none"
        variant="outline"
      >
        <option style={{ color: "black" }} value="house">
          House
        </option>
        <option style={{ color: "black" }} value="flat">
          Flat
        </option>
        <option style={{ color: "black" }} value="plot">
          Plot (Land)
        </option>
      </Select>
      <Stack direction="row">
        <Input
          onChange={(e) => handleInputChange(e, setValues, values)}
          type="number"
          placeholder="*Enter area"
          size="md"
          _placeholder={{ color: "gray.400" }}
          border="none"
          bgColor="gray.700"
          color="white"
          value={values.area}
          isInvalid={error.area}
          name="area"
        />
        <Select
          onChange={(e) => handleInputChange(e, setValues, values)}
          placeholder="*Area metric"
          name="areaType"
          bgColor="gray.700"
          variant="outline"
          color="white"
          border="none"
          value={values.areaType}
          isInvalid={error.areaType}
        >
          <option style={{ color: "black" }} value="sqfeet">
            Sq. Feet
          </option>
          <option style={{ color: "black" }} value="katha">
            Katha
          </option>
          <option style={{ color: "black" }} value="decimal">
            Decimal
          </option>
        </Select>
      </Stack>
      <Select
        onChange={(e) => handleInputChange(e, setValues, values)}
        placeholder="*Select facing"
        name="facing"
        bgColor="gray.700"
        border="none"
        variant="outline"
        value={values.facing}
        isInvalid={error.facing}
      >
        <option style={{ color: "black" }} value="north">
          North
        </option>
        <option style={{ color: "black" }} value="south">
          South
        </option>
        <option style={{ color: "black" }} value="east">
          East
        </option>
        <option style={{ color: "black" }} value="west">
          West
        </option>
        <option style={{ color: "black" }} value="northwest">
          North West
        </option>
        <option style={{ color: "black" }} value="northeast">
          North East
        </option>
        <option style={{ color: "black" }} value="southeast">
          South East
        </option>
        <option style={{ color: "black" }} value="southwest">
          South West
        </option>
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
          bgColor="gray.700"
          variant="outline"
          border="none"
          value={values.landType}
          isInvalid={error.landType}
          onChange={(e) => handleInputChange(e, setValues, values)}
        >
          <option style={{ color: "black" }} value="krishi">
            Krishi
          </option>
          <option style={{ color: "black" }} value="shali">
            Shali
          </option>
          <option style={{ color: "black" }} value="bastu">
            Bastu
          </option>
          <option style={{ color: "black" }} value="danga">
            Danga
          </option>
        </Select>
      )}
      <Stack direction="row">
        <Input
          onChange={(e) => handleInputChange(e, setValues, values)}
          type="number"
          _placeholder={{ color: "gray.400" }}
          border="none"
          bgColor="gray.700"
          color="white"
          value={values.price}
          placeholder="*Price of the property"
          name="price"
          isInvalid={error.price}
        />
        <Select
          onChange={(e) => handleInputChange(e, setValues, values)}
          placeholder="*Price type"
          name="priceType"
          bgColor="gray.700"
          variant="outline"
          border="none"
          value={values.priceType}
          isInvalid={error.priceType}
        >
          <option style={{ color: "black" }} value="emi">
            EMI
          </option>
          <option style={{ color: "black" }} value="lumpsum">
            Lumpsum
          </option>
        </Select>
      </Stack>
      <Input
        placeholder="Enter video link(if any)"
        size="md"
        name="videoLink"
        _placeholder={{ color: "gray.400" }}
        border="none"
        bgColor="gray.700"
        color="white"
        value={values.videoLink}
        onChange={(e) => handleInputChange(e, setValues, values)}
      />
      <Flex alignItems="center" ml={4} gap={4}>
        <Text>Is property verified?</Text>
        <Checkbox
          onChange={(e) => setValues({ ...values, verified: e.target.checked })}
          size="md"
          defaultChecked={values.verified}
        />
      </Flex>
    </Stack>
  )
}
