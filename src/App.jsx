import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import Layout, { ResultsList, Count } from "./components/Layout"
import SearchBox from "./components/SearchBox"
import ServiceCard from "./components/ServiceCard"
import Filters from "./components/Filters"
import Filter from "./components/Filter"
import config from "./_config"

const App = (props) => {

  const query = queryString.parse(window.location.search)

  const [collection, setCollection] = useState("")
  const [categories, setCategories] = useState([])
  const [only, setOnly] = useState([])

  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(query)}`)
      .then(res => res.json())
      .then(data => setResults(data.content))
  }, [])

  return(
    <Layout
      headerComponents={<>
        <SearchBox
          type={collection}
          setType={setCollection}
        />
      </>}
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
        <ResultsList>
          {results.map(s =>
            <ServiceCard key={s.id} {...s}/>  
          )}
        </ResultsList>
      </>}
    />
  )
}

export default App