import React from "react"
import logo from "./logo.svg"
import * as Styles from "../../components/Footer/Footer.styles"

export const vars_bfis = {
  slug: "bfis",
  title: "Family information service",
  contactEmail: "familyinfo@buckinghamshire.gov.uk",
  contactPhone: "01296 383 293",
  serviceHomepageUrl: "https://familyinfo.buckinghamshire.gov.uk",
  organisation: "Buckinghamshire Council",
  organisationUrl: "https://www.buckinghamshire.gov.uk/",
  tagline: "Find activities and organisations near you",
  beta: true,
  headerLogo: logo,
  mapSwitchSmall: true,
  footerNav: (
    <Styles.Nav>
      <Styles.NavLink href="https://familyinfo.buckinghamshire.gov.uk/about/">
        About the Buckinghamshire Family Information Service
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

export default vars_bfis
