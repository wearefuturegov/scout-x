import React, { useState, useEffect, useMemo, useContext } from "react"
import { useQuery } from "./../../utils"

import { useLocation } from "@reach/router"
import { theme } from "./../../themes/theme_generator"

import { normalizeQueryString } from "@outpost-platform/scout-components"

const AppStateContext = React.createContext(null)
const AppStateApiContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const AppStateProvider = ({ children }) => {
  // TODO not sure why normalizeQueryString is used but not removing rn because of time
  // TODO useLocation and search and useQuery needs some work
  // const { search } = useLocation()
  // const [locationSearch, setLocationSearch] = useState(
  //   normalizeQueryString(search)
  // )
  const [page, setPage] = useQuery("page", 1, { numerical: true })
  const [mapVisible, setMapVisible] = useQuery("map", false, { boolean: true })

  console.log("page:", page)

  const api = useMemo(
    () => ({
      page,
      setPage,
      mapVisible,
      setMapVisible,
    }),
    [page, setPage, mapVisible, setMapVisible]
  )

  return (
    <AppStateContext.Provider value={{ page, mapVisible }}>
      <AppStateApiContext.Provider value={api}>
        {children}
      </AppStateApiContext.Provider>
    </AppStateContext.Provider>
  )
}

const useAppState = () => {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error("useAppState must be used within the AppStateProvider")
  }

  return context
}

const useAppStateApi = () => {
  const context = useContext(AppStateApiContext)

  if (!context) {
    throw new Error("useAppStateApi must be used within the AppStateProvider")
  }

  return context
}

export { AppStateProvider, useAppState, useAppStateApi }
