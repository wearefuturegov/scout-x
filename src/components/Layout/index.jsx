import React from "react"

import styled, { createGlobalStyle } from "styled-components"
import Header from "../Header"
import Footer from "../Footer"
import Breadcrumbs from "../Breadcrumbs"
import Prefooter from "../Prefooter"

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.9rem;
  margin-bottom: 25px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    flex-direction: row;
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

export const ResultsFooter = styled.footer`
  margin-top: 25px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SkipLink = styled.a`
  position: absolute;
  font-size: 1rem;
  background: ${props => props.theme.styles.pale};
  top: 10px;
  left: 20px;
  padding: 10px;
  color: ${props => props.theme.styles.link};
  text-decoration: none;
  font-weight: bold;
  transform: translateY(-500px);
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    top: 13px;
    left: 13px;
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
    transform: translateY(0);
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const Layout = ({
  headerComponents,
  sidebarComponents,
  mainContentComponents,
}) => (
  <>
    <GlobalStyle />
    <SkipLink href="#main-content">Skip to main content</SkipLink>
    <Header />
    <PageHeader role="search">
      <PageHeaderInner>
        <Breadcrumbs />
        <PageTitle>Find activities and organisations near you</PageTitle>
        <MainContent id="main-content">{headerComponents}</MainContent>
      </PageHeaderInner>
    </PageHeader>
    <ResultsArea>
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
