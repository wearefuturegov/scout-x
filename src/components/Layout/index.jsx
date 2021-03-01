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

export const PageHeader = styled.div`
  padding: 30px ${theme.outerSpacing};
  @media screen and (min-width: ${theme.breakpointM}) {
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
  @media screen and (min-width: ${theme.breakpointM}) {
    font-size: 2.625rem;
    margin-bottom: 40px;
    max-width: 60%;
  }
`

const ResultsArea = styled.div`
  padding: 30px ${theme.outerSpacing};
  background: ${theme.pale};
  @media screen and (min-width: ${theme.breakpointM}) {
    padding: 60px ${theme.outerSpacing};
  }
`

const ResultsAreaInner = styled.div`
  max-width: ${theme.maxWidth};
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: ${theme.breakpointM}) {
    display: flex;
    flex-direction: row;
  }
`

const Sidebar = styled.aside`
  position: relative;
  @media screen and (min-width: ${theme.breakpointM}) {
    width: 300px;
    margin-right: 40px;
  }
  @media screen and (min-width: ${theme.breakpointL}) {
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
  @media screen and (min-width: ${theme.breakpointS}) {
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
  color: ${theme.grey};
  font-size: 0.9rem;
  margin-bottom: 0px;
  margin-right: 45px;
  flex: 1;
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

const Prefooter = styled.div`
  padding: 30px ${theme.outerSpacing};
  background: ${theme.text};
  color: ${theme.white};
  @media screen and (min-width: ${theme.breakpointM}) {
    padding: 60px ${theme.outerSpacing};
  }
`

const PrefooterInner = styled.div`
  max-width: ${theme.maxWidth};
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: ${theme.breakpointM}) {
    display: flex;
    flex-direction: row;
  }
`

const PrefooterColumn = styled.div`
  @media screen and (min-width: ${theme.breakpointM}) {
    flex: 1;
    width: 50%;
  }
  &:not(:last-of-type) {
    margin-bottom: 35px;
    @media screen and (min-width: ${theme.breakpointM}) {
      margin-bottom: 0px;
      padding-right: 20px;
      border-right: 1px solid ${theme.grey2};
      margin-right: 20px;
    }
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  p {
    margin-top: 15px;
    color: ${theme.offwhite};
  }
`

const PrefooterLink = styled.a`
  color: ${theme.white};
  font-weight: bold;
  margin-top: 15px;
  display: inline-block;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: ${theme.white};
  }
  &:focus {
    outline: 3px solid ${theme.focus};
    background: ${theme.focus};
    color: ${theme.text};
  }
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
  @media screen and (min-width: ${theme.breakpointM}) {
    top: 13px;
    left: 13px;
  }
  &:focus {
    outline: 3px solid ${theme.focus};
    transform: translateY(0);
  }
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
        <Sidebar>{sidebarComponents}</Sidebar>
        <MainArea id="results">{mainContentComponents}</MainArea>
      </ResultsAreaInner>
    </ResultsArea>
    <Prefooter role="complementary ">
      <PrefooterInner>
        <PrefooterColumn>
          <h2>Get in touch</h2>
          <p>
            Contact us online for more information and advice from our
            supportive team, or email or call us:
          </p>
          <PrefooterLink href="mailto:familyinfo@buckinghamshire.gov.uk">
            familyinfo@buckinghamshire.gov.uk
          </PrefooterLink>
          <p>01296 383 293</p>
        </PrefooterColumn>

        <PrefooterColumn>
          <h2>Feedback</h2>
          <p>This is a brand new website. Your feedback helps us improve it.</p>
          <PrefooterLink href={process.env.REACT_APP_FEEDBACK_URL || "#"}>
            Give feedback
          </PrefooterLink>
        </PrefooterColumn>

        <PrefooterColumn>
          <h2>Add or update directory listings</h2>
          <p>
            Create an account to add your organisation, activity or event to our
            directory. If you already have an account, sign in to update a
            listing or add a new one
          </p>
          <PrefooterLink href="https://familyinfo.buckinghamshire.gov.uk/create-your-account/">
            Create an account
          </PrefooterLink>
          <br />
          <PrefooterLink href="https://familyinfo.buckinghamshire.gov.uk/sign-in-to-your-account/">
            Sign in
          </PrefooterLink>
        </PrefooterColumn>
      </PrefooterInner>
    </Prefooter>
    <Footer />
  </>
)

export default Layout
