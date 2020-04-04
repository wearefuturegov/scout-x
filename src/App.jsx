import React from "react"
import theme from "./components/_theme"
import styled, { createGlobalStyle } from "styled-components"
import Layout from "./components/Layout"
import Breadcrumbs from "./components/Breadcrumbs"
import SearchBox from "./components/SearchBox"

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  *::-moz-focus-inner {
    border: 0;
  }
`

const Inner = styled.div`
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
    padding: 40px ${theme.outerSpacing};
  }
`

const App = () =>
  <>
    <GlobalStyle/>
    <Layout>
      <PageHeader>
        <Inner>
          <Breadcrumbs/>
          <PageTitle>Search in your area</PageTitle>
          <SearchBox/>
        </Inner>
      </PageHeader>
      <ResultsArea>
        <Inner>
          Test
        </Inner>
      </ResultsArea>
    </Layout>
  </>

export default App