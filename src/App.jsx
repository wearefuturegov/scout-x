import React, { useState, useEffect, useRef } from "react"
import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import Button from "./components/Button"
import Layout, { ResultsHeader, ResultsList, ResultsFooter, Count, NoResults } from "./components/Layout"
import Switch from "./components/Switch"
import SearchBar from "./components/SearchBar"
import ServiceCard from "./components/ServiceCard"
import Skeleton from "./components/ServiceCard/Skeleton"
import Filters from "./components/Filters"
import Filter from "./components/Filter"
import ListMap from "./components/ListMap"
import config from "./data/_config"

const App = ({
  children,
  location,
  navigate
}) => {

  const scrollTarget = useRef(null)

  const originalQuery = queryString.parse(location.search)

  const [collection, setCollection] = useState(originalQuery.collection || "services")
  const [coverage, setCoverage] = useState(originalQuery.coverage || "")
  const [lat, setLat] = useState(originalQuery.lat || "")
  const [lng, setLng] = useState(originalQuery.lng || "")

  const [categories, setCategories] = useState(originalQuery.categories ? [].concat(originalQuery.categories) : [])
  const [only, setOnly] = useState(originalQuery.only ? [].concat(originalQuery.only) : [])
  
  const [results, setResults] = useState(false)
  const [mapVisible, setMapVisible ] = useState(false)
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(parseInt(originalQuery.page) || 1)
  const [totalPages, setTotalPages] = useState(false)

  const fetchServices = async incrementPage => {
    setLoading(true)
    let newQuery = {
      lat,
      lng,
      categories,
      collection,
      coverage,
      only,
      page: incrementPage ? page + 1 : page
    }
    let res = await fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(newQuery)}`)
    let data = await res.json()
    navigate(`/?${queryString.stringify(newQuery)}`, {replace: true})
    setResults(data.content)
    setPage(data.number)
    setTotalPages(data.totalPages)
    setLoading(false)
  }

  const nextPage = () => {
    scrollTarget.current.scrollIntoView()
    fetchServices(true)
  }

  useEffect(() => {
    fetchServices()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng, categories, collection, coverage, only])

  console.log(scrollTarget)

  return(
    <>
      <Layout
        scrollRef={scrollTarget}
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
        mainContentComponents={!loading && results.length === 0 ?
          <NoResults>No results to show. Try widening your search.</NoResults>
          :
          <>
            <ResultsHeader>
              <Count>{results.length > 0 && <>Showing {originalQuery.page === 1 && "first "}{results.length} results</>}</Count>
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
              {totalPages > originalQuery.page &&
                <ResultsFooter>
                  <Button onClick={nextPage}>Load more</Button>
                </ResultsFooter>
              }
          </>
        }
      />
      {children}
    </>
  )
}

export default App