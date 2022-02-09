import React from "react"
import logo from "./logo.svg"
import * as Styles from "../../components/Footer/Footer.styles"

// import taxa from "./_taxonomies.json"
// usePresetTaxonomies: true,
// presetTaxonomies: taxa,

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
  serviceCard: {
    hideCategories: true,
  },
  cookieMessage: (
    <>
      <p>
        We use{" "}
        <a href="https://www.buckinghamshire.gov.uk/about/cookies/">
          cookies to collect information
        </a>{" "}
        about how you use the Buckinghamshire Council website.
      </p>
      <p>
        We use this information to improve the website and our services.{" "}
        <a href="https://www.buckinghamshire.gov.uk/about/cookies/">
          How to manage cookies.
        </a>
      </p>
    </>
  ),
  cookieName: "bod-scout",
  cookieCallback: () => {
    console.log("cookie callback")
    // Google Tag Manager
    ;(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l !== "dataLayer" ? "&l=" + l : ""
      j.async = true
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl
      f.parentNode.insertBefore(j, f)
    })(window, document, "script", "dataLayer", "GTM-NR4BWCK")
  },
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
  noLocationIsCountywide: true,
}

export default vars_bod
