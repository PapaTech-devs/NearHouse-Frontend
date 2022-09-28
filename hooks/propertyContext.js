import { createContext, useContext, useEffect, useState } from "react"
import { properties } from "../data"

const propertyContext = createContext({
  loading: false,
  allProperties: [],
  filteredProperties: [],
  filterObject: {},
  setFilterObject: () => {},
  fetchProperties: async (_) => {},
  filterProperties: () => {},
  selectedProperty: null,
  setSelectedProperty: () => {},
  regions: [],
  setRegions: () => {},
  myProperties: [],
  setMyProperties: () => {},
})

export function PropertyContextProvider({ children }) {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [filterObject, setFilterObject] = useState({})
  const [filteredProperties, setFilteredProperties] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [myProperties, setMyProperties] = useState([])
  const [regions, setRegions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => filterProperties(), [filterObject])

  async function fetchProperties(region) {
    setLoading(true)
    let data
    try {
      //   data = fetch("url").then((res) => res.json())
      data = properties
    } catch (err) {
      console.log(err)
    }
    setAllProperties(data)
    setFilteredProperties(data)
    setLoading(false)
  }

  function filterProperties() {
    let tempArray = [...allProperties]
    for (let key in filterObject) {
      if (
        (key === "maxPrice" || key === "maxEmiPrice") &&
        filterObject[key] !== ""
      ) {
        tempArray = tempArray.filter((property) => {
          if (key === "maxPrice" && property.priceType === "emi") return true
          if (key === "maxEmiPrice" && property.priceType === "lumpsum")
            return true
          return parseFloat(property.price) <= parseFloat(filterObject[key])
        })
      } else if (
        (key === "minPrice" || key === "minEmiPrice") &&
        filterObject[key] !== ""
      ) {
        tempArray = tempArray.filter((property) => {
          if (key === "minPrice" && property.priceType === "emi") return true
          if (key === "minEmiPrice" && property.priceType === "lumpsum")
            return true
          return parseFloat(property.price) >= parseFloat(filterObject[key])
        })
      } else {
        if (filterObject[key] !== "")
          tempArray = tempArray.filter((property) => {
            if (property[key] === "") return true
            return property[key] === filterObject[key]
          })
      }
    }
    setFilteredProperties(tempArray)
  }

  return (
    <propertyContext.Provider
      value={{
        selectedProperty: selectedProperty,
        setSelectedProperty: setSelectedProperty,
        filterProperties: filterProperties,
        filteredProperties: filteredProperties,
        allProperties: allProperties,
        fetchProperties: fetchProperties,
        loading: loading,
        filterObject: filterObject,
        setFilterObject: setFilterObject,
        regions: regions,
        setRegions: setRegions,
        myProperties: myProperties,
        setMyProperties: setMyProperties,
      }}
    >
      {children}
    </propertyContext.Provider>
  )
}

export const usePropertyContext = () => useContext(propertyContext)
