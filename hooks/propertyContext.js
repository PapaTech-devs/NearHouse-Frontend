import { createContext, useContext, useEffect, useState } from "react"

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
  setLoading: () => {},
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

  async function fetchProperties(regionName, callback) {
    setLoading(true)
    let data
    try {
      data = await fetch(`/backend/properties/region/${regionName}`).then(
        (res) => res.json()
      )
      if (data.length === 0) callback()
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
        setLoading: setLoading,
      }}
    >
      {children}
    </propertyContext.Provider>
  )
}

export const usePropertyContext = () => useContext(propertyContext)
