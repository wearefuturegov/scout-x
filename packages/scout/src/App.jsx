/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect, useRef, useContext } from "react"
import { Helmet } from "react-helmet"
import useQuery from "./hooks/useQuery"
import useFathom from "./hooks/useFathom"
import { Link } from "@reach/router"
import { AppSettingsContext } from "./contexts/AppSettings"

// fetch data for the app and filters
import { fetchServiceData, fetchSiteData } from "./lib/api"
import { setAllPaginationValues, normalizeQuerystring } from "./lib/utils"
import daysOptionsData from "./data/_days.json"
import onlyOptionsData from "./data/_only.json"
import {
  subcategoriesOf,
  formatAccessibilityOptions,
  formatDaysOptions,
  formatSuitabilityOptions,
} from "./lib/data-helpers"

import Layout, {
  ResultsHeader,
  ResultsList,
  Count,
  NoResults,
} from "./components/Layout"

import { orderFilters } from "./lib/order-filters"

import { Switch } from "@outpost-platform/scout-components"
import SearchBar from "./components/SearchBar"
import ServiceCard from "./components/ServiceCard"
import Skeleton from "./components/ServiceCard/Skeleton"
import Filters from "./components/Filters"
import Filter from "./components/Filter"
import RadioFilter from "./components/Filter/RadioFilter"
import KeywordFilter from "./components/Filter/KeywordFilter"
import AgeFilter from "./components/Filter/AgeFilter"
import ListMap from "./components/ListMap"
import ListMapStatic from "./components/ListMapStatic"
import Pagination from "./components/Pagination"
import PinboardLink from "./components/PinboardLink"
import { theme } from "./themes/theme_generator"
import { ClearFilters } from "@outpost-platform/scout-components"
import { checkCookiesAccepted } from "./lib/cookies"
import { AlertStatic } from "@outpost-platform/scout-components"

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
  }, [embedded, embedQuery])

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

  const filterSendNeeds = sendOptions.length > 0 && (
    <Filter
      key="sendNeeds"
      legend="SEND needs"
      options={sendOptions}
      selection={needs}
      setSelection={setNeeds}
      setPage={setPage}
      foldable
    />
  )

  const filterAges = (
    <AgeFilter
      key="ages"
      legend="Ages"
      maxAge={maxAge}
      setMaxAge={setMaxAge}
      minAge={minAge}
      setMinAge={setMinAge}
      setPage={setPage}
      foldable
    />
  )

  const filterAccessibilities = accessibilityOptions.length > 0 && (
    <Filter
      key="accessibilities"
      legend="Access needs"
      options={accessibilityOptions}
      selection={accessibilities}
      setSelection={setAccessibilities}
      setPage={setPage}
      foldable
    />
  )

  const filterOnlyShow = onlyOptions.length > 0 && (
    <Filter
      key="onlyShow"
      legend="Only show"
      options={onlyOptions}
      selection={only}
      setSelection={setOnly}
      setPage={setPage}
      foldable
    />
  )

  const filterDays = daysOptions.length > 0 && (
    <Filter
      key="days"
      legend="Days"
      options={daysOptions}
      selection={days}
      setSelection={setDays}
      setPage={setPage}
      foldable
    />
  )

  const filterSuitabilities = suitabilityOptions.length > 0 && (
    <Filter
      key="suitabilities"
      legend="Suitable for"
      options={suitabilityOptions}
      selection={suitabilities}
      setSelection={setSuitabilities}
      setPage={setPage}
      foldable
    />
  )

  const filters = {
    sendNeeds: {
      component: filterSendNeeds,
      clear: [setNeeds],
      clearValue: [[]],
    },
    ages: {
      component: filterAges,
      clear: [setMinAge, setMaxAge],
      clearValue: [false, false],
    },
    accessibilities: {
      component: filterAccessibilities,
      clear: [setAccessibilities],
      clearValue: [[]],
    },
    onlyShow: {
      component: filterOnlyShow,
      clear: [setOnly],
      clearValue: [[]],
    },
    days: {
      component: filterDays,
      clear: [setDays],
      clearValue: [[]],
    },
    suitabilities: {
      component: filterSuitabilities,
      clear: [setSuitabilities],
      clearValue: [[]],
    },
  }

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
            <Filters>
              <RadioFilter
                name="collection"
                options={collectionOptions}
                selection={collection}
                setSelection={setCollection}
                clearThis={setCategories}
                setPage={setPage}
              />
              {subcategoryOptions.length > 0 && (
                <Filter
                  legend="Categories"
                  options={subcategoryOptions}
                  selection={categories}
                  setSelection={setCategories}
                  setPage={setPage}
                  foldable
                />
              )}
              {orderFilters(filters, theme.filterOrder)}
              <ClearFilters
                setPage={setPage}
                filters={filters}
                clearCategory={setCollection}
                clearSubCategory={setCategories}
              />
            </Filters>
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

const MainContent = ({
  loading,
  results,
  keywords,
  coverage,
  mapVisible,
  setMapVisible,
  navigate,
  location,
  pagination,
  page,
  setPage,
  scrollTarget,
}) => {
  const cookiesAccepted = checkCookiesAccepted()
  // still loading
  if (loading)
    return (
      <>
        <ResultsHeader>
          <Count />
          <Switch
            id="map-toggle"
            checked={mapVisible}
            onChange={e => setMapVisible(e.target.checked)}
            label="Show map?"
          />
        </ResultsHeader>
        <ResultsList aria-live="polite">
          <Skeleton />
        </ResultsList>
      </>
    )

  // not loading and no results
  if (!results)
    return (
      <NoResults>
        There was a problem fetching results. Please try again later.
      </NoResults>
    )

  // not loading, results exists but is empty array
  if (results.length === 0)
    return <NoResults>No results to show. Try widening your search.</NoResults>

  // not loading, results exist and has length that is not 0
  return (
    <>
      <ResultsHeader>
        <Count>
          <>
            Showing{" "}
            {pagination.currentPage <= pagination.lastPage && (
              <>
                <strong>
                  {pagination.from} - {pagination.to} out of {pagination.total}
                </strong>{" "}
              </>
            )}
            results{" "}
            {keywords && (
              <>
                for <strong>{keywords}</strong>
              </>
            )}{" "}
            {coverage && (
              <>
                near <strong>{coverage}</strong>
              </>
            )}
          </>
        </Count>
        <Switch
          id="map-toggle"
          checked={mapVisible}
          onChange={e => setMapVisible(e.target.checked)}
          label="Show map?"
        />
      </ResultsHeader>
      {mapVisible &&
        (cookiesAccepted ? (
          <ListMap results={results} navigate={navigate} location={location} />
        ) : (
          <>
            <AlertStatic>{theme.cookiesDisabledMessage}</AlertStatic>
            <ListMapStatic results={results} />
          </>
        ))}
      <PinboardLink location={location} />
      <ResultsList aria-live="polite">
        {results?.map(s => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </ResultsList>
      <Pagination
        totalPages={pagination.totalPages}
        page={page}
        setPage={setPage}
        scrollTarget={scrollTarget}
      />
    </>
  )
}

export default App
