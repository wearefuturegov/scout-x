import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import theme from "./components/_theme"
import styled, { createGlobalStyle } from "styled-components"
import Layout from "./components/Layout"
import Breadcrumbs from "./components/Breadcrumbs"
import SearchBox from "./components/SearchBox"
import ServiceCard from "./components/ServiceCard"

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  *::-moz-focus-inner {
    border: 0 !important;

  }

  *::-moz-focusring {
    border: 0 !important;
  }
`

const PageHeaderInner = styled.div`
    max-width: ${theme.maxWidth};
    margin-left: auto;
    margin-right: auto;
`

const PageHeader = styled.header`
  padding: 30px ${theme.outerSpacing};
  @media screen and (min-width: ${theme.breakpointM}){
    padding: 40px ${theme.outerSpacing};
  }
`

const PageTitle = styled.h1`
  color: ${theme.text};
  font-size: 1.75rem;
  margin-bottom: 30px;
  @media screen and (min-width: ${theme.breakpointM}){
    font-size: 2.625rem;
    margin-bottom: 40px;
  }
`

const ResultsArea = styled.header`
  padding: 30px ${theme.outerSpacing};
  background: ${theme.pale};
  @media screen and (min-width: ${theme.breakpointM}){
    padding: 60px ${theme.outerSpacing};
  }
`

const ResultsAreaInner = styled.div`
    max-width: ${theme.maxWidth};
    margin-left: auto;
    margin-right: auto;
    @media screen and (min-width: ${theme.breakpointM}){
      display: flex;
      flex-direction: row;
    }
`

const Sidebar = styled.aside`
    @media screen and (min-width: ${theme.breakpointM}){
      width: 33%;
      margin-right: 20px;
      flex: 1;
    }
`

const MainArea = styled.div`
  width: 1;
  flex: 2;
`

const ResultsList = styled.ul`
  list-style: none;
`

const App = () => {

  const [services, setServices] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/services`)
      .then(res => res.json())
      .then(data => setServices(data.content))
  }, [])

  return(
    <>
      <GlobalStyle/>
      <Layout>
        <PageHeader>
          <PageHeaderInner>
            <Breadcrumbs/>
            <PageTitle>Search in your area</PageTitle>
            <SearchBox/>
          </PageHeaderInner>
        </PageHeader>
        <ResultsArea>
          <ResultsAreaInner>
            <Sidebar>
              Filters here
            </Sidebar>
            <MainArea>
              <ResultsList>
                {services.map(service =>
                  <ServiceCard {...service} key={service.id}/>
                )}
              </ResultsList>
            </MainArea>
          </ResultsAreaInner>
        </ResultsArea>
      </Layout>
    </>
  )
}

export default App