/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { AppSettingsContext } from "./contexts/AppSettings"
import useFathom from "./hooks/useFathom"
import useQuery from "./hooks/useQuery"

// fetch data for the app and filters
import daysOptionsData from "./data/_days.json"
import onlyOptionsData from "./data/_only.json"
import { fetchServiceData, fetchSiteData } from "./lib/api"
import {
  formatAccessibilityOptions,
  formatDaysOptions,
  formatSuitabilityOptions,
  subcategoriesOf,
} from "./lib/data-helpers"
import { normalizeQuerystring, setAllPaginationValues } from "./lib/utils"

import Layout from "./components/Layout"

import { theme } from "~/src/themes"
import SearchBar from "./components/SearchBar"

import MainContent from "./components/MainContent"
import SidebarContent from "./components/SidebarContent"

const App = ({ children, location, navigate }) => {
  const scrollTarget = useRef(null)

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

  const [mapVisible, setMapVisible] = useQuery("map", false, { boolean: true })

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useQuery("page", 1, { numerical: true })
  const [pagination, setPagination] = useState({})

  // filter options
  const [collectionOptions, setCollectionOptions] = useState([])
  const [subcategoryOptions, setSubcategoryOptions] = useState([])
  const [suitabilityOptions, setSuitabilityOptions] = useState([])
  const [sendOptions, setSendOptions] = useState([])
  const [accessibilityOptions, setAccessibilityOptions] = useState([])
  const [daysOptions, setDaysOptions] = useState(
    formatDaysOptions(daysOptionsData)
  )
  const [onlyOptions, setOnlyOptions] = useState(onlyOptionsData)

  // Embedded view variables
  const settings = useContext(AppSettingsContext)
  const embedded = settings?.embedded
  const filteredUrl = settings?.filteredUrl
  const index = filteredUrl ? filteredUrl.indexOf("?") : null
  const embedQuery = filteredUrl ? filteredUrl.substring(index) : null
  const [embedInitialised, setEmbedInitialised] = useState(false)

  const locationSearch = normalizeQuerystring(location.search)

  useEffect(() => {
    if (!embedded) {
      return
    }
    ;(async () => {
      await navigate(`${embedQuery}`, { replace: true })
      setEmbedInitialised(true)
    })()
  }, [embedded, embedQuery, navigate])

  useFathom()

  // only fetch once on site load
  useEffect(() => {
    fetchSiteData()
      .then(([taxonomies, suitabilities, sendOptions, accessibilities]) => {
        setCollectionOptions(taxonomies)
        setSuitabilityOptions(formatSuitabilityOptions(suitabilities))
        setSendOptions(sendOptions)
        setAccessibilityOptions(formatAccessibilityOptions(accessibilities))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // on page search update the data
  useEffect(() => {
    // ensure embed URL has initialised before loading data
    if (embedded && !embedInitialised) {
      return
    }
    setLoading(true)
    fetchServiceData(locationSearch)
      .then(data => {
        setResults(data.content)
        setPagination(
          setAllPaginationValues(
            data.totalElements,
            data.totalPages,
            data.number,
            theme.resultsPerPage
          )
        )
        setLoading(false)
      })
      .catch(() => {
        setResults([])
        setLoading(false)
      })
  }, [locationSearch, embedQuery, embedded, embedInitialised])

  // on page search we change collections so need to update sub categories
  useEffect(() => {
    setSubcategoryOptions(subcategoriesOf(collectionOptions, collection))
  }, [locationSearch, collectionOptions, collection])

  return (
    <>
      {embedded ? null : (
        <Helmet>
          <title>
            {page > 1 ? `Page ${page} ` : `${theme.tagline} `}| {theme.title} |{" "}
            {theme.organisation}
          </title>
        </Helmet>
      )}
      <Layout
        scrollRef={scrollTarget}
        headerComponents={
          <>
            {embedded ? "Embedded" : ""}
            <SearchBar
              keywords={keywords}
              setKeywords={setKeywords}
              coverage={coverage}
              setCoverage={setCoverage}
              setLat={setLat}
              setLng={setLng}
              setPage={setPage}
            />
          </>
        }
        sidebarComponents={
          <>
            <SidebarContent />
          </>
        }
        mainContentComponents={
          <>
            {embedded && embedInitialised && (
              <>This is the embedded version of scout</>
            )}
            <MainContent
              loading={loading}
              results={results}
              keywords={keywords}
              coverage={coverage}
              mapVisible={mapVisible}
              setMapVisible={setMapVisible}
              navigate={navigate}
              location={location}
              page={page}
              setPage={setPage}
              scrollTarget={scrollTarget}
              pagination={pagination}
            />
          </>
        }
      />
      {children}
    </>
  )
}

export default App
