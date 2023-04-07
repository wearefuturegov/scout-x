import React, { useState, useEffect, useMemo, useContext } from "react"
import { getFilterData } from "./../../utils"

import { getFilterDataHelpers } from "./../../utils"
const FilterDataStateContext = React.createContext(null)
const FilterDataApiContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const FilterDataProvider = ({ children }) => {
  const {
    formatAccessibilityOptions,
    formatSuitabilityOptions,
  } = getFilterDataHelpers
  const [filterData, setFilterData] = useState({
    isLoading: true,
    results: [],
    error: null,
  })

  const [collectionOptions, setCollectionOptions] = useState([])
  const [suitabilityOptions, setSuitabilityOptions] = useState([])
  const [sendOptions, setSendOptions] = useState([])
  const [accessibilityOptions, setAccessibilityOptions] = useState([])

  const fetchData = async () => {
    console.info("fetchingFilterData")
    getFilterData()
      .then(([taxonomies, suitabilities, sendOptions, accessibilities]) => {
        setCollectionOptions(taxonomies)
        setSuitabilityOptions(formatSuitabilityOptions(suitabilities))
        setSendOptions(sendOptions)
        setAccessibilityOptions(formatAccessibilityOptions(accessibilities))
      })
      .catch(err => {
        console.log(err)
      })
  }

  // only fetch once on site load
  useEffect(() => {
    fetchData()
  }, [])

  const api = useMemo(
    () => ({
      clearFilters: () => {
        // TODO clearFilters
        // setPage(1)
        // clearCategory(false)
        // clearSubCategory([])
      },
    }),
    [filterData, setFilterData]
  )

  return (
    <FilterDataStateContext.Provider
      value={{
        collectionOptions,
        suitabilityOptions,
        sendOptions,
        accessibilityOptions,
      }}
    >
      <FilterDataApiContext.Provider value={api}>
        {children}
      </FilterDataApiContext.Provider>
    </FilterDataStateContext.Provider>
  )
}

const useFilterDataState = () => {
  const context = useContext(FilterDataStateContext)

  if (!context) {
    throw new Error(
      "useFilterDataState must be used within the FilterDataProvider"
    )
  }

  return context
}

const useFilterDataApi = () => {
  const context = useContext(FilterDataApiContext)

  if (!context) {
    throw new Error(
      "useFilterDataApi must be used within the FilterDataProvider"
    )
  }

  return context
}

export { FilterDataProvider, useFilterDataState, useFilterDataApi }
