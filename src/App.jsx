import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import Layout, { ResultsList } from "./components/Layout"
import SearchBox from "./components/SearchBox"
import ServiceCard from "./components/ServiceCard"
import Filter from "./components/Filter"

const App = (props) => {

  console.log(props)

  const query = queryString.parse(window.location.search)

  const [type, setType] = useState([])

  const [results, setResults] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(query)}`)
      .then(res => res.json())
      .then(data => setResults(data.content))
  }, [])


  return(
    <Layout
      headerComponents={<>
        {type}
        <SearchBox
          type={type}
          setType={setType}
        />
      </>}
      sidebarComponents={<>
        <Filter/>
      </>}
      mainContentComponents={<>
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