/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useContext } from "react"
import { Helmet } from "react-helmet"

import Layout from "./components/Layout"
import MainContent from "./components/MainContent"
import { LocationSearch } from "./contexts/AppState"

const App = ({ children, location, navigate }) => {
  const scrollTarget = useRef(null)
  const locationSearch = LocationSearch()

  return (
    <>
      {/* {embedded ? null : (
        <Helmet>
          <title>
            {page > 1 ? `Page ${page} ` : `${theme.tagline} `}| {theme.title} |{" "}
            {theme.organisation}
          </title>
        </Helmet>
      )} */}
      <Layout
        scrollRef={scrollTarget}
        headerComponents={<>headerComponents</>}
        sidebarComponents={<>SidebarContent</>}
        mainContentComponents={
          <>
            <MainContent
              locationSearch={locationSearch}
              // loading={loading}
              // results={results}
              // keywords={keywords}
              // coverage={coverage}
              // mapVisible={mapVisible}
              // setMapVisible={setMapVisible}
              // navigate={navigate}
              // location={location}
              // page={page}
              // setPage={setPage}
              scrollTarget={scrollTarget}
              // pagination={pagination}
            />
          </>
        }
      />
      {children}
    </>
  )
}

export default App
