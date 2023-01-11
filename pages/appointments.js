import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { deleteAppointment, getAppointment, showToast } from "../utils"
import { BsFillTrashFill } from "react-icons/bs"
import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/contextHooks"

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [searchDate, setSearchDate] = useState(null)
  const [filterAppointments, setFilterAppointments] = useState([])
  const toast = useToast()
  const router = useRouter()
  const { authUser, loading } = useAuth()

  useEffect(() => {
    async function fetchAppointments() {
      const list = await getAppointment()
      let pastDates = list.filter(
        (item) => new Date(item.appointmentDate) < new Date()
      )
      let futureDates = list.filter(
        (item) => new Date(item.appointmentDate) >= new Date()
      )
      futureDates.sort((a, b) =>
        new Date(a.appointmentDate) < new Date(b.appointmentDate) ? -1 : 1
      )
      const sortedList = [...futureDates, ...pastDates]
      setAppointments(sortedList)
      setFilterAppointments(sortedList)
    }
    fetchAppointments()
  }, [])

  if (loading || !authUser || (authUser && authUser.role !== "admin")) {
    router.push("/")
    return <></>
  }

  function toDateTime(datetime) {
    const date = new Date(datetime)
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    const text = `${date.toLocaleString("en-US", options)}
    at ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}`
    return text
  }

  return (
    <Flex
      bgColor="black"
      color="white"
      px={["1.5rem", "2.5rem", "2.5rem", "3rem"]}
      direction="column"
    >
      <Head>
        <title>Appointment Dashboard</title>
      </Head>
      <Text fontSize="2xl" fontWeight="medium" py={4}>
        Appointments
      </Text>
      <Flex
        w={["100%", "45%", "45%", "45%"]}
        justifyContent="space-between"
        pb={4}
      >
        <Input type="date" onChange={(e) => setSearchDate(e.target.value)} />
        <Button
          ml={4}
          colorScheme="whatsapp"
          onClick={() => {
            setSearchDate(null)
            setFilterAppointments(
              appointments.filter(
                (appointment) => appointment.appointmentDate === searchDate
              )
            )
          }}
        >
          Search
        </Button>
        <Button
          ml={4}
          colorScheme="linkedin"
          onClick={() => {
            setFilterAppointments(appointments)
          }}
        >
          All
        </Button>
      </Flex>
      <Grid
        pr={2}
        gap={5}
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(4, 1fr)",
          "repeat(4, 1fr)",
        ]}
      >
        {filterAppointments.length != 0 &&
          filterAppointments.map((appointment) => (
            <Box
              border="1px"
              borderColor="gray.700"
              borderRadius="2%"
              boxShadow="base"
              position="relative"
              bgColor="gray.800"
              p={4}
              key={appointment.appointmentid}
              w="100%"
              _hover={{
                boxShadow: "lg",
                transitionDuration: "0.1s",
                borderColor: "gray.300",
              }}
            >
              <IconButton
                position="absolute"
                right="10px"
                top="10px"
                isLoading={deleteLoading}
                size="md"
                colorScheme="red"
                onClick={async (_) => {
                  setDeleteLoading(true)
                  await deleteAppointment(appointment.appointmentid)
                  setFilterAppointments(
                    filterAppointments.filter(
                      (item) => item.appointmentid !== appointment.appointmentid
                    )
                  )
                  setAppointments(
                    appointments.filter(
                      (item) => item.appointmentid !== appointment.appointmentid
                    )
                  )
                  showToast("Appointment Deleted", "success", toast)
                  setDeleteLoading(false)
                }}
                icon={<BsFillTrashFill />}
              />
              <Text>Name: {appointment.fullname}</Text>
              <Text>Email: {appointment.email}</Text>
              <Text>Mobile: {appointment.mobile}</Text>
              <Text>
                Date & Time: {toDateTime(appointment.appointmentDate)}
              </Text>
              {appointment.propertyid !== "loan" ? (
                <Link href={`/property/${appointment.propertyid}`}>
                  <Text cursor="pointer" fontWeight="bold">
                    View Property
                  </Text>
                </Link>
              ) : (
                <Text fontWeight="bold">Asked for Loan</Text>
              )}
            </Box>
          ))}
      </Grid>
    </Flex>
  )
}
