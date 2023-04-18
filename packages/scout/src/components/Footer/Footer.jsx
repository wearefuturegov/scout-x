import React from "react"
import { theme } from "~/src/themes"
import * as Styles from "./Footer.styles"
import ogl from "./ogl.svg"

const Footer = ({ children }) => (
  <Styles.Outer>
    <Styles.Inner>
      {theme.footerNav}
      <Styles.License>
        <img src={ogl} alt="Open Government License" />
        All content is available under the{" "}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0
        </a>
        , except where otherwise stated
      </Styles.License>
      <Styles.Copyright>
        © {new Date().getFullYear()} {theme.organisation}
      </Styles.Copyright>
    </Styles.Inner>
  </Styles.Outer>
)

export default Footer
