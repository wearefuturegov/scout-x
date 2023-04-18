import React, { useContext, useEffect, useState, useCallback } from "react"
import { getServiceData } from "~/src/utils"

import { useAppState } from "~/src/contexts"
import { theme } from "~/src/themes"
import { useFetcher } from "react-router-dom"

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { AppStateProvider } from "../AppState"

const ServiceDataStateContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const ServiceDataProvider = ({ children }) => {
  const queryClient = new QueryClient()
  const { searchLocation, page } = useAppState()
  const [servicePaginationInfo, setServicePaginationInfo] = useState({
    total: undefined,
    totalPages: undefined,
    perPage: undefined,
    currentPage: undefined,
    lastPage: undefined,
    from: undefined,
    to: undefined,
  })

  const {
    status: serviceStatus,
    data: serviceData,
    error: serviceError,
    isFetching: serviceIsFetching,
    isPreviousData: serviceIsPreviousData,
  } = useQuery(["services", page], () => getServiceData(`?page=${page}`), {
    keepPreviousData: true,
    staleTime: 5000,
  })

  // setup pagination info
  React.useEffect(() => {
    if (serviceData) {
      const pagination = {
        total: serviceData.totalElements,
        totalPages: serviceData.totalPages,
        perPage: serviceData.size,
        currentPage: page,
        nextPage: Math.max(page + 1, 1),
        prevPage: Math.max(page - 1, 0),
        lastPage: Math.ceil(serviceData.totalElements / serviceData.size),
        from: (page - 1) * serviceData.size + 1,
        to:
          page * serviceData.size < serviceData.totalElements
            ? page * serviceData.size
            : serviceData.totalElements,
      }
      setServicePaginationInfo(pagination)
    }
  }, [page, serviceData])

  // Prefetch the next page
  React.useEffect(() => {
    // if (data?.hasMore) {
    if (serviceData && serviceData?.last === false) {
      console.log("prefetch", ["services", page + 1])
      queryClient.prefetchQuery(["services", page + 1], () =>
        getServiceData(`?page=${page + 1}`)
      )
    }
  }, [page, queryClient, searchLocation, serviceData])

  return (
    <ServiceDataStateContext.Provider
      value={{
        serviceStatus,
        serviceData,
        serviceError,
        serviceIsFetching,
        serviceIsPreviousData,
        servicePaginationInfo,
      }}
    >
      {children}
    </ServiceDataStateContext.Provider>
  )
}

const useServiceDataState = () => {
  const context = useContext(ServiceDataStateContext)

  if (!context) {
    throw new Error(
      "useServiceDataState must be used within the ServiceData provider"
    )
  }

  return context
}

export { ServiceDataProvider, useServiceDataState }
