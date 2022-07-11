import React from "react"
import logo from "./logo.svg"

// import taxa from "./_taxonomies.json"
// usePresetTaxonomies: true,
// presetTaxonomies: taxa,

export const vars_tvvru = {
  slug: "tvvru",
  title: "Thames Valley Violence Reduction Unit",
  contactEmail: "vrutechnicalsupport@thamesvalley.police.uk",
  serviceHomepageUrl: "/",
  organisation: "Thames Valley Violence Reduction Unit",
  organisationUrl: "https://www.tvvru.co.uk/",
  tagline: "The Thames Valley Wide Service directory for professional users",
  beta: true,
  headerLogo: logo,
  mapSwitchSmall: true,
  cookiesDisabledMessage:
    "Please note, some functionality such as interactive maps and location auto complete is currently disabled. Please accept cookies to use these features.",
  cookieMessage: (
    <>
      <p>
        We use cookies to collect information about how you use this website.
      </p>
      <p>We use this information to improve the website and our services.</p>
    </>
  ),
  cookieName: "tvvru-scout",
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
    })(window, document, "script", "dataLayer", "G-P53SF67DQB")
  },
  filterOrder: [
    {
      order: 6,
      name: "send-needs",
    },
    {
      order: 1,
      name: "ages",
    },
    {
      order: 3,
      name: "accessibilities",
    },
    {
      order: 2,
      name: "only-show",
    },
    {
      order: 4,
      name: "days",
    },
    {
      order: 5,
      name: "suitabilities",
    },
  ],
  noLocationIsCountywide: true,
}

export default vars_tvvru
