/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react"
import { Helmet } from "react-helmet"
import useQuery from "./hooks/useQuery"
import { fetchResultsByQuery } from "./lib/api"
import { only as onlyOptions } from "./data/_config"
import { 
  collectionOptions, 
  sendOptions, 
  ageOptions, 
  subcategoriesOf 
} from "./lib/transform-taxonomies"

import Layout, { ResultsHeader, ResultsList, Count, NoResults } from "./components/Layout"
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
import Pagination from "./components/Pagination"
import PinboardLink from "./components/PinboardLink"

const App = ({
  children,
  location,
  navigate
}) => {

  const scrollTarget = useRef(null)

  const [keywords, setKeywords] = useQuery("keywords", "")

  const [coverage, setCoverage] = useQuery("location", "")
  const [lat, setLat] = useQuery("lat", "")
  const [lng, setLng] = useQuery("lng", "")

  const [collection, setCollection] = useQuery("collection", false)

  const [categories, setCategories] = useQuery("categories", [], {array: true})
  const [ages, setAges] = useQuery("ages", [], {array: true})
  const [needs, setNeeds] = useQuery("needs", [], {array: true})
  const [minAge, setMinAge] = useQuery("min_age", false, {numerical: true})
  const [maxAge, setMaxAge] = useQuery("max_age", false, {numerical: true})
  const [only, setOnly] = useQuery("only", [], {array: true})

  const [mapVisible, setMapVisible ] = useQuery("map", false)

  const [results, setResults] = useState([])
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
      <Helmet>
        <title>{page > 1 ? `Page ${page}` : "Find activities and organisations near you"} | Family information service | Buckinghamshire Council</title>}
      </Helmet>
      <Layout
        scrollRef={scrollTarget}
        headerComponents={
          <SearchBar
            keywords={keywords}
            setKeywords={setKeywords}
            coverage={coverage}
            setCoverage={setCoverage}
            setLat={setLat}
            setLng={setLng}
            setPage={setPage}
          />
        }
        sidebarComponents={<>
          <Filters>
            <RadioFilter
              name="collection"
              options={collectionOptions}
              selection={collection}
              setSelection={setCollection}
              clearThis={setCategories}
              setPage={setPage}
            />
            {collection &&
              <Filter
                legend="Categories"
                options={subcategoriesOf(collection)}
                selection={categories}
                setSelection={setCategories}
                setPage={setPage}
                foldable
              />
            }
            <Filter
              legend="SEND needs"
              options={sendOptions}
              selection={needs}
              setSelection={setNeeds}
              setPage={setPage}
              foldable
            />
            <AgeFilter
              legend="Ages"
              maxAge={maxAge}
              setMaxAge={setMaxAge}
              minAge={minAge}
              setMinAge={setMinAge}
              setPage={setPage}
              foldable
            />
            {/* <Filter
              legend="Only show"
              options={onlyOptions}
              selection={only}
              setSelection={setOnly}
              setPage={setPage}
              foldable
            /> */}
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
            {mapVisible && 
              <ListMap 
                results={results}
                navigate={navigate}
                location={location}
              />
            }
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
            {!loading &&
              <Pagination
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                scrollTarget={scrollTarget}
              />
            }
          </>
        }
      />
      {children}
    </>
  )
}

export default App