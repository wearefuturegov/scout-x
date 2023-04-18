import React from "react"
import { PageHeader, PageHeaderInner, PageTitle } from "./PageHeader.styles"
import { Breadcrumbs } from "~/src/components"

const Layout = ({ headerComponents }) => (
  <PageHeader role="search">
    <PageHeaderInner>
      <Breadcrumbs />
      <PageTitle>Find activities and organisations near you</PageTitle>
      <div id="main-content">{headerComponents}</div>
    </PageHeaderInner>
  </PageHeader>
)

export default Layout
