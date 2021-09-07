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
      <Styles.NavLink href="https://www.buckinghamshire.gov.uk/about/accessibility/">
        Accessibility statement
      </Styles.NavLink>
      <Styles.NavLink href="https://www.buckinghamshire.gov.uk/your-council/privacy/privacy-policy/">
        Privacy policy
      </Styles.NavLink>
      <Styles.NavLink href="https://www.buckinghamshire.gov.uk/about/cookies/">
        Cookies
      </Styles.NavLink>
    </Styles.Nav>
  ),
  filterOrder: [
    {
      order: 1,
      name: "suitabilities",
    },
    {
      order: 2,
      name: "accessibilities",
    },
    {
      order: 3,
      name: "ages",
    },
    {
      order: 4,
      name: "days",
    },
    {
      order: 5,
      name: "only-show",
    },
  ],
}

export default vars_bod
