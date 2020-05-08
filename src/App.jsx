import React, { useState, useEffect, useRef } from "react"
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

  const [categories, setCategories] = useQuery("categories", [])
  const [only, setOnly] = useQuery("only", [])
  
  const [results, setResults] = useState(false)
  const [mapVisible, setMapVisible ] = useState(false)
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useQuery("page", 1, true)
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
          />
        }
        sidebarComponents={<>
          <Filters>
            {page}
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
              <Count>{results.length > 0 && <>Showing {page === 1 && "first "}{results.length} results</>}</Count>
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
                  <Button onClick={() => setPage(page + 1)}>Next page</Button>
                  {page > 1 && 
                    <button onClick={() => setPage(page - 1)}>Previous page</button>
                  }
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