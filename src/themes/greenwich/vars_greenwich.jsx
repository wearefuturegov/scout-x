import React from "react"
import logo from "./logo.svg"
import { Body } from "../../components/Dialog"
import { getServiceMeta } from "../../lib/utils"
import CqcWidget from "./CqcWidget"

export const vars_greenwich = {
  slug: "greenwich",
  title: "Greenwich community directory",
  contactEmail: "fg-support@tpximpact.com",
  serviceHomepageUrl: "https://scout-and-outpost.netlify.app/",
  organisation: "TPXimpact",
  organisationUrl: "https://www.tpximpact.com",
  tagline: "Find activities and organisations near you",
  beta: true,
  headerLogo: logo,
  mapSwitchSmall: true,
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
  cookieName: "greenwich-scout",
  cookieCallback: () => {
    console.log("loadcookies")
  },
  serviceCard: {
    footer: service => {
      let CqcLocationId = getServiceMeta(service.meta)?.["CQC Location ID"]

      return (
        <>
          {CqcLocationId && (
            <Body>
              <CqcWidget locationId={CqcLocationId} />
            </Body>
          )}
        </>
      )
    },
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

export default vars_greenwich
