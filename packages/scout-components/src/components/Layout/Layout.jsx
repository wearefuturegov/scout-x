import React from "react"

import {
  Header,
  Footer,
  Breadcrumbs,
  Prefooter,
  SkipLink,
  PageHeader,
} from "./../../"

import {
  GlobalStyle,
  ResultsArea,
  ResultsAreaInner,
  Sidebar,
  MainArea,
} from "./Layout.styles"

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
    <PageHeader headerComponents={headerComponents} />
    <ResultsArea ref={scrollRef}>
      <ResultsAreaInner>
        {sidebarComponents && (
          <Sidebar id="sidebar" aria-label="sidebar">
            {sidebarComponents}
          </Sidebar>
        )}
        <MainArea id="results">{mainContentComponents}</MainArea>
      </ResultsAreaInner>
    </ResultsArea>
    <Prefooter />
    <Footer />
  </>
)

export default Layout
