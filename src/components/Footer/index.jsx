import React from "react"
import ogl from "./ogl.svg"
import * as Styles from "./Footer.styles"
import { theme } from "./../../themes/theme_generator"

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
