/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react"
import { Helmet } from "react-helmet"
import useQuery from "./hooks/useQuery"
import useFathom from "./hooks/useFathom"

// fetch data for the app and filters
import { fetchServiceData, fetchSiteData } from "./lib/api"
import daysOptionsData from "./data/_days.json"
import onlyOptionsData from "./data/_only.json"
import {
  subcategoriesOf,
  formatAccessibilityOptions,
  formatDaysOptions,
  formatSuitabilityOptions,
  removeDuplicateServices,
  sortServices,
} from "./lib/data-helpers"

import Layout, {
  ResultsHeader,
  ResultsList,
  Count,
  NoResults,
} from "./components/Layout"

import { orderFilters } from "./lib/order-filters"

import Switch from "./components/Switch"
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
import ClearFilters from "./components/ClearFilters"
import { checkCookiesAccepted } from "./lib/cookies"
import AlertStatic from "./components/AlertStatic"

const App = ({ children, location, navigate }) => {
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

  const [page, setPage] = useState(1)
  const [appState, setAppState] = useState({
    page: 1,
    search: location.search,
    pageChanged: true,
    prevPages: [0],
  })

  const [estTotalResults, setEstTotalResults] = useState(0)
  const [moreResults, setMoreResults] = useState(true)

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

  const handleResults = useCallback(
    (services, search, includePrevServices = false) => {
      setResults(prevResults => {
        const newResults = includePrevServices
          ? [...prevResults, ...services.content]
          : services.content
        const deduplicatedResults = removeDuplicateServices(newResults)
        const sortedResults = sortServices(deduplicatedResults, search)
        return sortedResults
      })
      let moreResults = services.moreResults !== 0
      if (moreResults) {
        setEstTotalResults(services.estTotalResults)
      }
      setMoreResults(moreResults)
    },
    []
  )

  useFathom()

  // only fetch once on site load
  useEffect(() => {
    let ignore = false
    const getFilterOptions = async () => {
      let [
        taxonomies,
        suitabilities,
        sendOptions,
        accessibilities,
      ] = await fetchSiteData()

      if (theme?.parentTaxonomySlug) {
        const parentTaxonomy = taxonomies.find(
          t => t.slug === theme.parentTaxonomySlug
        )
        if (parentTaxonomy && parentTaxonomy.children) {
          taxonomies = parentTaxonomy.children
        }
      }

      if (!ignore) {
        setCollectionOptions(taxonomies)
        setSuitabilityOptions(formatSuitabilityOptions(suitabilities))
        setSendOptions(sendOptions)
        setAccessibilityOptions(formatAccessibilityOptions(accessibilities))
      }
    }

    getFilterOptions()

    return () => {
      ignore = true
    }
  }, [])

  // we can't rely on location.search or page to trigger a new fetch especially with async issues so we use appState
  useEffect(() => {
    let active = true

    const getNewData = async () => {
      setLoading(true)
      const services = await fetchServiceData(appState.search, appState.page)

      if (active) {
        handleResults(services, appState.search, appState.pageChanged)
        setLoading(false)
      }
    }

    // if we're going back and forward between pages we don't want to fetch new data unnecessarily
    // so if appState.pageChanged === true and the page we're currently on has already been fetched then
    // don't fetch new data or just ignore the page change completely if its a location change
    if (
      (appState.pageChanged && !appState.prevPages.includes(appState.page)) ||
      !appState.pageChanged
    ) {
      getNewData()
    }

    return () => {
      active = false
    }
  }, [handleResults, appState])

  // when the location changes then update the relevant information
  // make sure that pageChanged is false when search changes
  useEffect(() => {
    setAppState(prevAppState => {
      if (prevAppState.search !== location.search) {
        return {
          ...prevAppState,
          search: location.search,
          pageChanged: false,
          prevPages: [0],
        }
      } else {
        return prevAppState
      }
    })
  }, [location.search])

  // when page changes add some relevant information for the page slice logic
  useEffect(() => {
    setAppState(prevAppState => {
      if (prevAppState.page !== page) {
        return {
          ...prevAppState,
          page,
          pageChanged: true,
          prevPages: [...prevAppState.prevPages, prevAppState.page],
        }
      } else {
        return prevAppState
      }
    })
  }, [page])

  // on page search we change collections so need to update sub categories
  useEffect(() => {
    setSubcategoryOptions(subcategoriesOf(collectionOptions, collection))
  }, [location.search, collectionOptions, collection])

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
      <Helmet>
        <title>
          {page > 1 ? `Page ${page} ` : `${theme.tagline} `}| {theme.title} |{" "}
          {theme.organisation}
        </title>
      </Helmet>
      <Layout
        headerComponents={
          <>
            <SearchBar
              keywords={keywords}
              setKeywords={setKeywords}
              coverage={coverage}
              setCoverage={setCoverage}
              setLat={setLat}
              setLng={setLng}
              setPage={setPage}
            />
            {theme.headerComponents ?? theme.headerComponents}
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
            estTotalResults={estTotalResults}
          />
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
  estTotalResults,
  page,
  setPage,
}) => {
  const scrollTarget = useRef(null)
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
      <ResultsHeader ref={scrollTarget}>
        <Count>
          <>
            Showing{" "}
            {page <= Math.ceil(results.length / theme.resultsPerPage) && (
              <>
                <strong>
                  {(page - 1) * theme.resultsPerPage + 1}-
                  {Math.min(page * theme.resultsPerPage, results.length)}
                </strong>{" "}
                out of{" "}
                <strong>
                  {Math.ceil(results.length / theme.resultsPerPage) > page ? (
                    <>~{estTotalResults}</>
                  ) : (
                    <>{results.length}</>
                  )}
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
                within {theme.proximity / 1609.34} miles of{" "}
                <strong>{coverage}</strong>
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
        {results
          ?.slice(
            (page - 1) * theme.resultsPerPage,
            page * theme.resultsPerPage
          )
          .map((s, i) => (
            <ServiceCard
              key={s.id}
              // ref={i === 0 ? scrollTarget : null}
              {...s}
            />
          ))}
      </ResultsList>
      <Pagination
        totalPages={Math.ceil(results.length / theme.resultsPerPage)}
        page={page}
        setPage={setPage}
        scrollTarget={scrollTarget}
      />
    </>
  )
}

export default App
