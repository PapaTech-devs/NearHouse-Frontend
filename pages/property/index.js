import { Flex, Button, Text } from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import AddPropertyTabs from "../../components/property/AddPropertyTabs"
import ListMyProperties from "../../components/property/ListMyProperties"
import { useAuth } from "../../hooks/contextHooks"
import { usePropertyContext } from "../../hooks/propertyContext"

export default function PropertyPage() {
  const [add, setAdd] = useState(false)
  const { setRegions, setMyProperties, setLoading } = usePropertyContext()
  const { authUser, loading } = useAuth()
  const [editingProperty, setEditingProperty] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        let res = await fetch("/backend/regions")
        const regionData = await res.json()
        res = await fetch(`/backend/properties/user/${authUser.userid}`)
        const propertyData = await res.json()
        setRegions(regionData)
        setMyProperties(propertyData)
        setLoading(false)
      } catch (err) {
        console.error(err)
        alert(err.toString())
      }
    }
    if (!loading) fetchData()
  }, [loading])

  if (loading) return <>Loading contents</>

  return (
    <Flex
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      direction="column"
      pb={4}
      bgColor="black"
      h="90vh"
    >
      <Head>
        <title>Add Property</title>
      </Head>
      <Flex w="100%" justifyContent="space-between" mt="2" mb="4" color="white">
        <Text fontSize="xl" fontWeight="bold">
          {add ? "Add Property" : "Your Listed Properties"}
        </Text>
        <Button
          variant="dark"
          _hover={{ color: "white", bg: add ? "red.500" : "green.500" }}
          onClick={() => {
            setEditingProperty(null)
            setAdd(!add)
          }}
        >
          {add ? "Close" : "Add"}
        </Button>
      </Flex>
      {add ? (
        <AddPropertyTabs editingProperty={editingProperty} setAdd={setAdd} />
      ) : (
        <ListMyProperties
          setAdd={setAdd}
          setEditingProperty={setEditingProperty}
        />
      )}
    </Flex>
  )
}
