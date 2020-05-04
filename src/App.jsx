import React, { useState, useEffect } from "react"
import { Route, useHistory } from "react-router-dom"
import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import Layout, { ResultsList, Count } from "./components/Layout"
import SearchBar from "./components/SearchBar"
import ServiceCard from "./components/ServiceCard"
import Skeleton from "./components/ServiceCard/Skeleton"
import Filters from "./components/Filters"
import Filter from "./components/Filter"
import DetailDialog from "./components/DetailDialog"
import config from "./_config"

const App = () => {

  let history = useHistory()

  const originalQuery = queryString.parse(history.location.search)

  const [collection, setCollection] = useState(originalQuery.collection || "services")
  const [coverage, setCoverage] = useState(originalQuery.coverage || "")
  const [categories, setCategories] = useState([].concat(originalQuery.categories))
  const [only, setOnly] = useState([].concat(originalQuery.only))

  const [results, setResults] = useState(false)

  useEffect(() => {
    setResults(false)
    // 1. Form new query
    let newQuery = {
      categories,
      only,
      collection,
      coverage
    }
    // 2. Update URL
    history.replace(`/?${queryString.stringify(newQuery)}`)
    // 3. Retrieve new results
    fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(newQuery)}`)
      .then(res => res.json())
      .then(data => setResults(data.content))
  }, [history, categories, only, coverage, collection])

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
      <Route path="/service/:id">
        <DetailDialog/>
      </Route>
    </>
  )
}

export default App