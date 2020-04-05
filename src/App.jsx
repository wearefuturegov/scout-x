import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import Layout, { ResultsList } from "./components/Layout"
import SearchBox from "./components/SearchBox"
import ServiceCard from "./components/ServiceCard"


const App = () => {

  const [services, setServices] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/services`)
      .then(res => res.json())
      .then(data => setServices(data.content))
  }, [])

  return(
    <Layout
      headerComponents={<>
        <SearchBox/>
      </>}
      sidebarComponents={"test"}
      mainContentComponents={<>
        <ResultsList>
          {services.map(s =>
            <ServiceCard key={s.id} {...s}/>  
          )}
        </ResultsList>
      </>}
    />
  )
}

export default App