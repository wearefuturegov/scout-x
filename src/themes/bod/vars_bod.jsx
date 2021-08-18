import React from "react"
import logo from "./logo.svg"
import * as Styles from "../../components/Footer/Footer.styles"

export const vars_bod = {
  slug: "bod",
  title: "Bucks Online Directory",
  contactEmail: "communities@buckinghamshire.gov.uk",
  contactPhone: false,
  serviceHomepageUrl: "https://directory.buckinghamshire.gov.uk",
  organisation: "Buckinghamshire Council",
  organisationUrl: "https://www.buckinghamshire.gov.uk/",
  tagline: "Find activities, groups and services near you",
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
  filterOrder: [
    {
      order: 1,
      name: "send-needs",
    },
    {
      order: 2,
      name: "accessibility",
    },
    {
      order: 3,
      name: "ages",
    },
    {
      order: 4,
      name: "only-show",
    },
  ],
}

export default vars_bod
