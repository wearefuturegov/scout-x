/* eslint-disable no-unused-vars */
import React, { useRef } from "react"
import { Helmet } from "react-helmet"

import {
  LocationNavigate,
  LocationSearch,
  useAppState,
  useAppStateApi,
} from "./contexts/AppState"

import {
  Layout,
  MainContent,
  SearchBar,
  SidebarContent,
  useSettingsState,
} from "@outpost-platform/scout-components"
import { theme } from "./themes/theme_generator"

import { useServiceDataState } from "./contexts/ServiceData"

import Debugger from "./components/Debugger"
import { useFilterDataApi, useFilterDataState } from "./contexts/FilterData"
const App = ({ children }) => {
  const scrollTarget = useRef(null)
  const locationSearch = LocationSearch()
  const {
    settings: { embedded },
  } = useSettingsState()
  const locationNavigate = LocationNavigate()
  const { mapVisible, page, collection, keywords, coverage } = useAppState()
  const filterDataApi = useFilterDataApi()

  const { isLoading, error, results, pagination } = useServiceDataState()
  const {
    setNextPage,
    setPreviousPage,
    setMapVisible,
    setCategories,
    setCoverage,
    setPage,
    setKeywords,
    setLat,
    setLng,
  } = useAppStateApi()
  const { collectionOptions } = useFilterDataState()
  const { setCollection } = useFilterDataApi()
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
      {embedded ? "embedded" : "not embedded"}

      <Debugger />
      <Layout
        embedded={embedded}
        scrollRef={scrollTarget}
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
          </>
        }
        sidebarComponents={
          <>
            <SidebarContent filterDataApi={filterDataApi} />
          </>
        }
        mainContentComponents={
          <>
            <MainContent
              locationSearch={locationSearch}
              locationNavigate={locationNavigate}
              isLoading={isLoading}
              results={results}
              error={error}
              pagination={pagination}
              // keywords={keywords}
              // coverage={coverage}
              mapVisible={mapVisible}
              setMapVisible={setMapVisible}
              setNextPage={setNextPage}
              setPreviousPage={setPreviousPage}
              page={page}
              scrollTarget={scrollTarget}
            />
          </>
        }
      />
      {children}
    </>
  )
}

export default App
