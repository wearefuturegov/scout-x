import React from "react"
import logo from "./logo.svg"
import * as Styles from "../../components/Footer/Footer.styles"

export const vars_generic = {
  slug: "generic",
  title: "Scout",
  contactEmail: "support@wearefuturegov.com",
  serviceHomepageUrl: "https://scout-and-outpost.netlify.app/",
  organisation: "FutureGov",
  organisationUrl: "https://www.wearefuturegov.com",
  tagline: "Find activities and organisations near you",
  beta: true,
  headerLogo: logo,
  mapSwitchSmall: true,
  footerNav: (
    <Styles.Nav>
      <Styles.NavLink href="https://familyinfo.buckinghamshire.gov.uk/about/">
        About the Buckinghamshire Online Directory
      </Styles.NavLink>
      <Styles.NavLink href="https://familyinfo.buckinghamshire.gov.uk/accessibility-statement-/">
        Accessibility statement
      </Styles.NavLink>
      <Styles.NavLink href="https://familyinfo.buckinghamshire.gov.uk/privacy-policy/">
        Privacy policy
      </Styles.NavLink>
      <Styles.NavLink href="https://www.buckinghamshire.gov.uk/about/cookies/">
        Cookies
      </Styles.NavLink>
      <Styles.NavLink href="https://familyinfo.buckinghamshire.gov.uk/publiccustomer-disclaimer/">
        Public and customer disclaimer
      </Styles.NavLink>
    </Styles.Nav>
  ),
}

export default vars_generic
