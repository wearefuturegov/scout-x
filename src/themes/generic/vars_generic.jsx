import React from "react"
import logo from "./logo.svg"

export const vars_generic = {
  slug: "generic",
  title: "Scout",
  contactEmail: "fg-support@tpximpact.com",
  serviceHomepageUrl: "https://scout-and-outpost.netlify.app/",
  organisation: "TPXimpact",
  organisationUrl: "https://www.tpximpact.com",
  tagline: "Find activities and organisations near you",
  beta: true,
  headerLogo: logo,
  mapSwitchSmall: true,
  usePresetTaxonomies: false,
  cookiesDisabledMessage:
    "Please note, some functionality such as interactive maps and location auto complete is currently disabled. Please accept cookies to use these features.",
  cookieMessage: (
    <>
      <p>
        We use cookies to collect information about how you use the Scout
        website.
      </p>
      <p>We use this information to improve the website and our services.</p>
    </>
  ),
  cookieName: "generic-scout",
  cookieCallback: () => {
    console.log("loadcookies")
  },
  filterOrder: [
    {
      order: 1,
      name: "accessibilities",
    },
    {
      order: 2,
      name: "ages",
    },
    {
      order: 3,
      name: "days",
    },
    {
      order: 4,
      name: "only-show",
    },
  ],
  footerNav: null,
}

export default vars_generic
