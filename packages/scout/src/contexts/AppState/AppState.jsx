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
  const [mapVisible, setMapVisible] = useQuery("map", false, {
    boolean: true,
  })

  const [keywords, setKeywords] = useQuery("keywords", "")

  const [coverage, setCoverage] = useQuery("location", "")
  const [lat, setLat] = useQuery("lat", "")
  const [lng, setLng] = useQuery("lng", "")

  const [collection, setCollection] = useQuery("collection", false)

  const [categories, setCategories] = useQuery("categories", [], {
    array: true,
  })
  const [ages, setAges] = useQuery("ages", [], { array: true })
  const [needs, setNeeds] = useQuery("needs", [], { array: true })
  const [accessibilities, setAccessibilities] = useQuery(
    "accessibilities",
    [],
    {
      array: true,
    }
  )
  const [suitabilities, setSuitabilities] = useQuery("suitabilities", [], {
    array: true,
  })
  const [days, setDays] = useQuery("days", [], { array: true })
  const [minAge, setMinAge] = useQuery("min_age", false, { numerical: true })
  const [maxAge, setMaxAge] = useQuery("max_age", false, { numerical: true })
  const [only, setOnly] = useQuery("only", [], { array: true })

  const api = useMemo(
    () => ({
      setNextPage: () => {
        setPage(page + 1)
      },
      setPreviousPage: () => {
        setPage(page - 1)
      },
      setMapVisible,
    }),
    [setPage, setMapVisible, page]
  )

  return (
    <AppStateContext.Provider
      value={{
        page,
        mapVisible,
        keywords,
        coverage,
        lat,
        lng,
        collection,
        categories,
        ages,
        needs,
        accessibilities,
        suitabilities,
        days,
        minAge,
        maxAge,
        only,
      }}
    >
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
