/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react"
import Layout, { ResultsHeader, ResultsList, Count, NoResults } from "./components/Layout"
import Switch from "./components/Switch"
import SearchBar from "./components/SearchBar"
import ServiceCard from "./components/ServiceCard"
import Skeleton from "./components/ServiceCard/Skeleton"
import Filters from "./components/Filters"
import Filter from "./components/Filter"
import KeywordFilter from "./components/Filter/KeywordFilter"
import ListMap from "./components/ListMap"
import Pagination from "./components/Pagination"
import PinboardLink from "./components/PinboardLink"
import config from "./data/_config"
import useQuery from "./hooks/useQuery"
import { fetchResultsByQuery } from "./lib/api"

const App = ({
  children,
  location,
  navigate
}) => {

  const scrollTarget = useRef(null)

  const [collection, setCollection] = useQuery("collection", "services")
  const [coverage, setCoverage] = useQuery("coverage", "")
  const [lat, setLat] = useQuery("lat", "")
  const [lng, setLng] = useQuery("lng", "")

  const [categories, setCategories] = useQuery("categories", [], {array: true})

  const [only, setOnly] = useQuery("only", [], {array: true})
  const [accessibility, setAccessibility] = useQuery("accessibility", [], {array: true})

  const [keywords, setKeywords] = useQuery("keywords", "")

  const [results, setResults] = useState(false)
  const [mapVisible, setMapVisible ] = useState(false)
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useQuery("page", 1, {numerical: true})
  const [totalPages, setTotalPages] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchResultsByQuery(location.search).then(data => {
      setResults(data.content)
      setTotalPages(data.totalPages)
      setLoading(false)
    })
  }, [location.search])

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
            setPage={setPage}
          />
        }
        sidebarComponents={<>
          <Filters>
            <Filter
              legend="Categories"
              options={config.categories}
              selection={categories}
              setSelection={setCategories}
              setPage={setPage}
            />
            <Filter
              legend="Only show"
              options={config.only}
              selection={only}
              setSelection={setOnly}
              setPage={setPage}
            />
            <Filter
              legend="Accessibility"
              options={config.accessibility}
              selection={accessibility}
              setSelection={setAccessibility}
              setPage={setPage}
              foldable
            />
            <KeywordFilter
              value={keywords}
              setValue={setKeywords}
              setPage={setPage}
            />
          </Filters>
        </>}
        mainContentComponents={!loading && results.length === 0 ?
          <NoResults>No results to show. Try widening your search.</NoResults>
          :
          <>
            <ResultsHeader>
              <Count>
                {results.length > 0 && 
                  <>Showing {page === 1 && "first "}{results.length} results</>
                }
              </Count>
              <Switch
                id="map-toggle"
                checked={mapVisible}
                onChange={e => setMapVisible(e.target.checked)}
                label="Show map?"
              />
            </ResultsHeader>
            {mapVisible && <ListMap results={results}/>}
            <PinboardLink location={location}/>
            <ResultsList aria-live="polite">
              {loading ?
                <Skeleton/>
                :
                results.map(s =>
                  <ServiceCard key={s.id} {...s}/>  
                )
              }
            </ResultsList>
            <Pagination
              totalPages={totalPages}
              page={page}
              setPage={setPage}
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