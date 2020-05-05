import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import Layout, { ResultsList, Count } from "./components/Layout"
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
  const [categories, setCategories] = useState(originalQuery.categories ? [].concat(originalQuery.categories) : [])
  const [only, setOnly] = useState(originalQuery.only ? [].concat(originalQuery.only) : [])

  const [results, setResults] = useState(false)

  useEffect(() => {
    setResults(false)
    let newQuery = {
      categories,
      only,
      collection,
      coverage
    }
    navigate(`/?${queryString.stringify(newQuery)}`)
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
          <Count>Showing {results.length} results near <strong>XXX</strong></Count>
          <ResultsList aria-live="polite">
            {results ?
              results.map(s =>
                <ServiceCard key={s.id} {...s}/>  
              )
            : 
            <Skeleton/>
            }
          </ResultsList>
        </>}
      />
      {children}
    </>
  )
}

export default App