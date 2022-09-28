import { Flex, Button, Text } from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import AddPropertyTabs from "../../components/property/AddPropertyTabs"
import { usePropertyContext } from "../../hooks/propertyContext"

export default function PropertyPage() {
  const [add, setAdd] = useState(false)
  const { setRegions } = usePropertyContext()

  useEffect(() => {
    async function fetchRegions() {
      try {
        const res = await fetch("/backend/regions")
        const data = await res.json()
        setRegions(data)
      } catch (err) {
        console.error(err)
        alert(err.toString())
      }
    }
    fetchRegions()
  }, [])

  return (
    <Flex px={["2rem", "2.5rem", "2.5rem", "3rem"]} direction="column">
      <Head>
        <title>Add Property</title>
      </Head>
      <Flex w="100%" justifyContent="space-between" my="2">
        <Text fontSize="xl" fontWeight="bold">
          {add ? "Add Property" : "Your Listed Properties"}
        </Text>
        <Button onClick={() => setAdd(!add)}>{add ? "Close" : "Add"}</Button>
      </Flex>
      {add ? <AddPropertyTabs /> : <p>Property Listing</p>}
    </Flex>
  )
}
