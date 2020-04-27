import React from "react"
import theme from "../_theme"
import styled, { createGlobalStyle } from "styled-components"
import Header from "../Header"
import Footer from "../Footer"
import Breadcrumbs from "../Breadcrumbs"

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

export const PageHeader = styled.header`
  padding: 30px ${theme.outerSpacing};
  @media screen and (min-width: ${theme.breakpointM}){
    padding: 40px ${theme.outerSpacing};
  }
`

const PageHeaderInner = styled.div`
    max-width: ${theme.maxWidth};
    margin-left: auto;
    margin-right: auto;
`

export const PageTitle = styled.h1`
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
      width: 25%;
      margin-right: 40px;
      flex: 1;
    }
`

const MainArea = styled.div`
  width: 1;
  flex: 2;
`

export const ResultsList = styled.ul`
  list-style: none;
`

export const Count = styled.p`
  color: ${theme.grey};
  font-size: 0.9rem;
  margin-bottom: 25px;
`

const Layout = ({
    headerComponents,
    sidebarComponents,
    mainContentComponents
}) =>
    <>
        <GlobalStyle/>
        <Header/>
        <PageHeader>
            <PageHeaderInner>
                <Breadcrumbs/>
                <PageTitle>Search in your area</PageTitle>
                {headerComponents}
            </PageHeaderInner>
        </PageHeader>
        <ResultsArea>
            <ResultsAreaInner>
                <Sidebar>
                    {sidebarComponents}
                </Sidebar>
                <MainArea>
                    {mainContentComponents}
                </MainArea>
            </ResultsAreaInner>
        </ResultsArea>
        <Footer/>
    </>

export default Layout