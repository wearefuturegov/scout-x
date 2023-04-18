import React, { useContext, useEffect, useMemo, useState } from "react"
import { getFilterData, getFilterDataHelpers } from "~/src/utils"
import {
  useTaxonomies,
  useSuitabilities,
  useSendNeeds,
  useAccessibilities,
  formatAccessibilityOptions,
} from "~/src/hooks"
import { useQueryClient } from "react-query"

const FilterDataStateContext = React.createContext(null)
const FilterDataApiContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const FilterDataProvider = ({ children }) => {
  const { formatSuitabilityOptions } = getFilterDataHelpers
  const [filterData, setFilterData] = useState({
    isLoading: true,
    results: [],
    error: null,
  })

  const queryClient = useQueryClient()
  const {
    status: taxonomyStatus,
    data: taxonomyData,
    error: taxonomyError,
    isFetching: taxonomyIsFetching,
  } = useTaxonomies()

  let {
    status: suitabilityStatus,
    data: suitabilityData,
    error: suitabilityError,
    isFetching: suitabilityIsFetching,
  } = useSuitabilities()

  if (suitabilityData !== undefined) {
    suitabilityData = suitabilityData.sort((a, b) =>
      a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
    )
  }

  const {
    status: sendNeedsStatus,
    data: sendNeedsData,
    error: sendNeedsError,
    isFetching: sendNeedsIsFetching,
  } = useSendNeeds()

  let {
    status: accessibilitiesStatus,
    data: accessibilitiesData,
    error: accessibilitiesError,
    isFetching: accessibilitiesIsFetching,
  } = useAccessibilities()

  if (accessibilitiesData !== undefined) {
    accessibilitiesData = accessibilitiesData.sort((a, b) =>
      a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
    )
  }

  const api = useMemo(
    () => ({
      clearFilters: () => {
        // TODO clearFilters
        // setPage(1)
        // clearCategory(false)
        // clearSubCategory([])
      },
    }),
    []
  )

  return (
    <FilterDataStateContext.Provider
      value={{
        taxonomies: {
          status: taxonomyStatus,
          data: taxonomyData,
          error: taxonomyError,
          isFetching: taxonomyIsFetching,
        },
        suitabilities: {
          status: suitabilityStatus,
          data: suitabilityData,
          error: suitabilityError,
          isFetching: suitabilityIsFetching,
        },
        sendNeeds: {
          status: sendNeedsStatus,
          data: sendNeedsData,
          error: sendNeedsError,
          isFetching: sendNeedsIsFetching,
        },
        accessibilities: {
          status: accessibilitiesStatus,
          data: accessibilitiesData,
          error: accessibilitiesError,
          isFetching: accessibilitiesIsFetching,
        },
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
