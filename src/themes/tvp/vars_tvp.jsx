import React from "react"
import logo from "./logo.jpg"

// import taxa from "./_taxonomies.json"
// usePresetTaxonomies: true,
// presetTaxonomies: taxa,

export const vars_tvp = {
  slug: "tvp",
  title: "Thames Valley Police Violence Reduction Unit",
  serviceHomepageUrl: "/",
  organisation: "Thames Valley Police Violence Reduction Unit",
  organisationUrl: "https://www.tvvru.co.uk/",
  tagline: "Find activities and organisations",
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
  cookieName: "tvp-scout",
  cookieCallback: () => {
    console.log("cookieCallback")
  },
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
      order: 3,
      name: "accessibilities",
    },
    {
      order: 4,
      name: "only-show",
    },
    {
      order: 5,
      name: "days",
    },
    {
      order: 6,
      name: "suitabilities",
    },
  ],
}

export default vars_tvp
