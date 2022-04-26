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
  footerNav: null,
}

export default vars_generic
