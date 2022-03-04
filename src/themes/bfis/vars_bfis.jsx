import React from "react"
import logo from "./logo.svg"
import * as Styles from "../../components/Footer/Footer.styles"

// import taxa from "./_taxonomies.json"
// usePresetTaxonomies: true,
// presetTaxonomies: taxa,

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
        about how you use the Buckinghamshire Council website and directories.
      </p>
      <p>
        We use this information to improve the website, directories and our
        services.{" "}
        <a href="https://www.buckinghamshire.gov.uk/about/cookies/">
          How to manage cookies.
        </a>
      </p>
    </>
  ),
  cookieName: "bfis-scout",
  cookieCallback: () => {
    console.log("cookieCallback")
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
    })(window, document, "script", "dataLayer", "GTM-NHRXC57")

    // Siteimprove
    ;(function () {
      var sz = document.createElement("script")
      sz.type = "text/javascript"
      sz.async = true
      sz.src = "//siteimproveanalytics.com/js/siteanalyze_300776.js"
      var s = document.getElementsByTagName("script")[0]
      s.parentNode.insertBefore(sz, s)
    })()
  },
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
  filterOrder: [
    {
      order: 1,
      name: "send-needs",
    },
    {
      order: 2,
      name: "ages",
    },
    {
      order: 4,
      name: "days",
    },
    {
      order: 3,
      name: "only-show",
    },
  ],
}

export default vars_bfis
