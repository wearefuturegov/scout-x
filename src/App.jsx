import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import Button from "./components/Button"
import Layout, { ResultsHeader, ResultsList, ResultsFooter, Count } from "./components/Layout"
import Switch from "./components/Switch"
import SearchBar from "./components/SearchBar"
import ServiceCard from "./components/ServiceCard"
import Skeleton from "./components/ServiceCard/Skeleton"
import Filters from "./components/Filters"
import Filter from "./components/Filter"
import config from "./_config"

const App = ({
  children,
  location,
  navigate
}) => {

  const originalQuery = queryString.parse(location.search)

  const [collection, setCollection] = useState(originalQuery.collection || "services")
  const [coverage, setCoverage] = useState(originalQuery.coverage || "")
  const [lat, setLat] = useState(originalQuery.lat || "")
  const [lng, setLng] = useState(originalQuery.lng || "")

  const [categories, setCategories] = useState(originalQuery.categories ? [].concat(originalQuery.categories) : [])
  const [only, setOnly] = useState(originalQuery.only ? [].concat(originalQuery.only) : [])
  
  const [mapVisible, setMapVisible ] = useState(false)

  const [results, setResults] = useState(false)

  useEffect(() => {
    setResults(false)
    let newQuery = {
      lat,
      lng,
      categories,
      only,
      collection,
      coverage
    }
    navigate(`?${queryString.stringify(newQuery)}`)
    fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(newQuery)}`)
      .then(res => res.json())
      .then(data => setResults(data.content))
  }, [categories, only, coverage, collection])

  return(
    <>
      <Layout
        headerComponents={
          <SearchBar
            type={collection}
            setType={setCollection}
            coverage={coverage}
            setCoverage={setCoverage}
            setLat={setLat}
            setLng={setLng}
          />
        }
        sidebarComponents={<>
          <Filters>
            <Filter
              legend="Categories"
              options={config.categories}
              selection={categories}
              setSelection={setCategories}
            />
            <Filter
              legend="Only show"
              options={config.only}
              selection={only}
              setSelection={setOnly}
            />
          </Filters>
        </>}
        mainContentComponents={<>
          <ResultsHeader>
            <Count>Showing {results.length} results near <strong>XXX</strong></Count>
            <Switch
              id="map-toggle"
              checked={mapVisible}
              onChange={e => setMapVisible(e.target.checked)}
              label="Show map?"
            />
          </ResultsHeader>
          <ResultsList aria-live="polite">
            {results ?
              results.map(s =>
                <ServiceCard key={s.id} {...s}/>  
              )
            : 
            <Skeleton/>
            }
          </ResultsList>
          <ResultsFooter>
            <Button>Load more</Button>
          </ResultsFooter>
        </>}
      />
      {children}
    </>
  )
}

export default App