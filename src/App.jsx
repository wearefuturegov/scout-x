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
import ListMap from "./components/ListMap"
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
  
  const [page, setPage] = useState(parseInt(originalQuery.page) || 1)

  const [results, setResults] = useState(false)

  const [totalPages, setTotalPages] = useState(false)
  const [mapVisible, setMapVisible ] = useState(false)

  const [loading, setLoading] = useState(true)

  const fetchNewServices = async () => {
    setLoading(true)
    let newQuery = {
      page,
      lat,
      lng,
      categories,
      only,
      collection,
      coverage
    }
    navigate(`?${queryString.stringify(newQuery)}`)
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(newQuery)}`)
    const data = await res.json()
    setResults(data.content)
    setPage(data.number)
    setTotalPages(data.totalPages)
    setLoading(false)
  }

  const nextPage = () => {
    setPage(page + 1)
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    fetchNewServices()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, lat, lng, categories, only, coverage, collection])

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
        mainContentComponents={results ?
          <>
            <ResultsHeader>
              <Count>Showing {results.length} results</Count>
              <Switch
                id="map-toggle"
                checked={mapVisible}
                onChange={e => setMapVisible(e.target.checked)}
                label="Show map?"
              />
            </ResultsHeader>
            {mapVisible && <ListMap results={results}/>}
            <ResultsList aria-live="polite">
              {loading ?
                <Skeleton/>
                :
                results.map(s =>
                  <ServiceCard key={s.id} {...s}/>  
                )
              }
            </ResultsList>
              {totalPages > page &&
                <ResultsFooter>
                  <Button onClick={nextPage}>Load more</Button>
                </ResultsFooter>
              }
          </>
          :
          <p>No results to show. Try widening your search.</p>
        }
      />
      {children}
    </>
  )
}

export default App