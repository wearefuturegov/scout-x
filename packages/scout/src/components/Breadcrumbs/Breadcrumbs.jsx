import React from "react"
import { theme } from "~/src/themes"
import { Crumb, Link, Outer } from "./Breadcrumbs.styles"

const Breadcrumbs = () => (
  <Outer>
    <Crumb>
      <Link href={theme.serviceHomepageUrl}>Home</Link>
    </Crumb>
    <Crumb>Service directory</Crumb>
  </Outer>
)

export default Breadcrumbs
