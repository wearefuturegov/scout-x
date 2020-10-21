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

  p{
    line-height: 1.5;
    color: ${theme.text};
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

const ResultsArea = styled.div`
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
      width: 300px;
      margin-right: 40px;
    }
    @media screen and (min-width: ${theme.breakpointL}){
      margin-right: 60px;
    }
`

const MainArea = styled.div`
  flex: 1;
`

export const ResultsHeader = styled.header`
  margin-bottom: 25px;
  *:first-child{
    margin-bottom: 15px;
  }
  @media screen and (min-width: ${theme.breakpointS}){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    *:first-child{
      margin-bottom: 0px;
    }
  }
`

export const Count = styled.p`
  color: ${theme.grey};
  font-size: 0.9rem;
  margin-bottom: 0px;
`

export const NoResults = styled.p`
  color: ${theme.grey};
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
  background: ${theme.pale};
  top: 10px;
  left: 20px;
  padding: 10px;
  color: ${theme.link};
  text-decoration: none;
  font-weight: bold;
  transform: translateY(-500px);
  @media screen and (min-width: ${theme.breakpointM}){
    top: 13px;
    left: 13px;
  }
  &:focus{
    outline: 3px solid ${theme.focus};
    transform: translateY(0);
  }
`

const Layout = ({
    headerComponents,
    sidebarComponents,
    mainContentComponents,
    scrollRef
}) =>
    <>
        <GlobalStyle/>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Header/>
        <PageHeader>
            <PageHeaderInner>
                <Breadcrumbs/>
                <PageTitle>Find activities and organisations near you</PageTitle>
                <div id="main-content">

                {headerComponents}
                </div>
            </PageHeaderInner>
        </PageHeader>
        <ResultsArea ref={scrollRef}>
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