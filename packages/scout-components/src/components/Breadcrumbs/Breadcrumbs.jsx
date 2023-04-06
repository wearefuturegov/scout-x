import React from "react"
import { Outer, Crumb, Link } from "./Breadcrumbs.styles"
import { theme } from "./../../themes/theme_generator"

const Breadcrumbs = () => (
  <Outer>
    <Crumb>
      <Link href={theme.serviceHomepageUrl}>Home</Link>
    </Crumb>
    <Crumb>Service directory</Crumb>
  </Outer>
)

export default Breadcrumbs
