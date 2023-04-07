import React, { useState, useEffect, useContext } from "react"
import { getServiceData } from "./../../utils"
import { useLocation } from "@reach/router"

import { theme } from "./../../themes/theme_generator"
import { useAppState, LocationSearch } from "./../AppState"

import { normalizeQueryString } from "@outpost-platform/scout-components"

const ServiceDataStateContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const ServiceDataProvider = ({ children }) => {
  const locationSearch = LocationSearch()
  const appState = useAppState()
  const [serviceData, setServiceData] = useState({
    isLoading: true,
    pagination: [],
    results: [],
    error: false,
  })

  // console.log("serviceData:", serviceData)
  const fetchData = async () => {
    console.info("fetchingData")
    setServiceData({
      ...serviceData,
      isLoading: true,
    })

    getServiceData(locationSearch)
      .then(data => {
        // TODO something weird happening with pagination
        const numberOfResults = data.totalElements
        const totalPages = data.totalPages
        const currentPage = data.number
        const itemsPerPage = theme.resultsPerPage

        // TODO per page should be in site settings
        // TODO rename these to match API names
        setServiceData({
          ...serviceData,
          results: data.content,
          isLoading: false,
          pagination: {
            total: numberOfResults,
            totalPages: totalPages,
            perPage: itemsPerPage,
            currentPage: currentPage,
            lastPage: Math.ceil(numberOfResults / itemsPerPage),
            from: (currentPage - 1) * itemsPerPage + 1,
            to:
              currentPage * itemsPerPage < numberOfResults
                ? currentPage * itemsPerPage
                : numberOfResults,
          },
        })
      })
      .catch(() => {
        setServiceData({
          ...serviceData,
          results: [],
          isLoading: false,
          error: true,
        })
      })
  }

  // whenever the appState: page changes fetch the data again
  useEffect(() => {
    fetchData()

    if (serviceData.pagination.currentPage !== appState.page) {
      console.log(serviceData.pagination.currentPage, appState.page)
    }
  }, [appState.page])

  return (
    <ServiceDataStateContext.Provider value={serviceData}>
      {children}
    </ServiceDataStateContext.Provider>
  )
}

const useServiceDataState = () => {
  const context = useContext(ServiceDataStateContext)

  if (!context) {
    throw new Error(
      "useServiceDataState must be used within the ServiceDataProvider"
    )
  }

  return context
}

export { ServiceDataProvider, useServiceDataState }
