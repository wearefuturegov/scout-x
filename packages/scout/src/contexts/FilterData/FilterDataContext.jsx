import React, { useState, useEffect, useMemo, useContext } from "react"

const FilterDataStateContext = React.createContext(null)
const FilterDataApiContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const FilterDataProvider = ({ children }) => {
  const [filterData, setFilterData] = useState({
    isLoading: true,
    results: [],
    error: null,
  })

  const api = useMemo(
    () => ({
      filterData,
      setFilterData,
    }),
    [filterData, setFilterData]
  )

  return (
    <FilterDataStateContext.Provider value={filterData}>
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
