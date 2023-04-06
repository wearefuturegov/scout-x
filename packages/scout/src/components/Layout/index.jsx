import React from "react"

import styled, { createGlobalStyle } from "styled-components"
import {
  Header,
  Footer,
  Breadcrumbs,
  Prefooter,
  SkipLink,
} from "@outpost-platform/scout-components"

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

  p{
    line-height: 1.5;
    color: ${props => props.theme.styles.text};
  }
`

export const PageHeader = styled.div`
  padding: 30px ${props => props.theme.styles.outerSpacing};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 40px ${props => props.theme.styles.outerSpacing};
  }
`

const PageHeaderInner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
`

export const PageTitle = styled.h1`
  color: ${props => props.theme.styles.text};
  font-size: 1.75rem;
  margin-bottom: 30px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    font-size: 2.625rem;
    margin-bottom: 40px;
    max-width: 60%;
  }
`

const ResultsArea = styled.div`
  padding: 30px ${props => props.theme.styles.outerSpacing};
  background: ${props => props.theme.styles.pale};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 60px ${props => props.theme.styles.outerSpacing};
  }
`

const ResultsAreaInner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: flex;
    flex-direction: row;
  }
`

const Sidebar = styled.aside`
  position: relative;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    width: 300px;
    margin-right: 40px;
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointL}) {
    margin-right: 60px;
  }
`

const MainArea = styled.main`
  flex: 1;
`

export const ResultsHeader = styled.div`
  margin-bottom: 25px;
  *:first-child {
    margin-bottom: 15px;
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointS}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    *:first-child {
      margin-bottom: 0px;
    }
  }
`

export const Count = styled.p`
  color: ${props => props.theme.styles.grey};
  font-size: 0.9rem;
  margin-bottom: 0px;
  margin-right: 45px;
  flex: 1;
`

export const NoResults = styled.p`
  color: ${props => props.theme.styles.grey};
  text-align: center;
  font-size: 1.2rem;
  margin: 50px;
`

export const ResultsList = styled.ul`
  list-style: none;
`

const Layout = ({
  headerComponents,
  sidebarComponents,
  mainContentComponents,
  scrollRef,
}) => (
  <>
    <GlobalStyle />
    <SkipLink href="#main-content">Skip to main content</SkipLink>
    <Header />
    <PageHeader role="search">
      <PageHeaderInner>
        <Breadcrumbs />
        <PageTitle>Find activities and organisations near you</PageTitle>
        <div id="main-content">{headerComponents}</div>
      </PageHeaderInner>
    </PageHeader>
    <ResultsArea ref={scrollRef}>
      <ResultsAreaInner>
        <Sidebar id="sidebar" aria-label="sidebar">
          {sidebarComponents}
        </Sidebar>
        <MainArea id="results">{mainContentComponents}</MainArea>
      </ResultsAreaInner>
    </ResultsArea>
    <Prefooter />
    <Footer />
  </>
)

export default Layout
