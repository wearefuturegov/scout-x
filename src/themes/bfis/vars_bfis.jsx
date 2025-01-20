import React from "react"
import SingleStrongLink from "../../components/SingleStrongLink"
import logo from "./logo.svg"
import * as Styles from "../../components/Footer/Footer.styles"
import ResponsiveSentence from "../../components/ResponsiveSentence"
import { AStrong } from "../../components/A"
import {
  FamilyHubsNetworkTag,
  FamilyHubsNetworkDetailDialog,
} from "../../components/FamilyHubsNetwork"

export const vars_bfis = {
  slug: "bfis",
  title: "Family information service",
  contactEmail: "familyinfo@buckinghamshire.gov.uk",
  contactPhone: "01296 383 293",
  contactForm:
    "https://my.buckinghamshire.gov.uk/portal/itouchvision/r/gds/category_link?cuid=FD9FD6EDD42732928F7E205634D070AA8CA0E0D9&lang=EN&P_LANG=en",
  socialMedia: [
    {
      type: "facebook",
      label: "Buckinghamshire Council Facebook",
      url: "https://www.facebook.com/bucksfamilyinfo",
    },
    {
      type: "twitter",
      label: "Buckinghamshire Council Twitter",
      url: "https://x.com/bucksfamilyinfo",
    },
    {
      type: "youtube",
      label: "Buckinghamshire Council Youtube",
      url: "https://www.youtube.com/channel/UC1FH7pKrMzhgotJVCV9RzcA",
    },
    {
      type: "instagram",
      label: "Buckinghamshire Council Instagram",
      url: "https://www.instagram.com/bucksfamilyinfo",
    },
    {
      type: "linkedin",
      label: "Buckinghamshire Council Linkedin",
      url: "https://www.linkedin.com/company/bucksfamilyinfo",
    },
  ],
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
  showResultsPerPage: true,
  cookiesDisabledMessage:
    "Please note, cookies are needed for site functionality such as interactive maps and location autocomplete.",
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

    // Google Tag Manager - new GA4
    ;(function (w, d, s, l, i) {
      w[l] = w[l] || []
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l !== "dataLayer" ? "&l=" + l : ""
      j.async = true
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl
      f.parentNode.insertBefore(j, f)
    })(window, document, "script", "dataLayer", "GTM-W9X4P7B")

    // Google Tag Manager - original - remove after July 2023
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
  filterOnlyOptions: [
    // {
    //   label: "Needs referral",
    //   slug: "needs-referral",
    // },
    {
      label: "Part of SEND Local Offer",
      slug: "local-offer",
    },
    {
      label: "Part of Family Hub Network",
      slug: "family-hub",
      value: "Yes",
      type: "meta",
    },
  ],
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
      name: "only-show",
    },
    {
      order: 4,
      name: "starttime-endtime-day",
    },
    {
      order: 5,
      name: "schedule",
    },
  ],
  headerComponents: (
    <SingleStrongLink
      text="How to use this directory"
      url="https://familyinfo.buckinghamshire.gov.uk/directory-how-to"
    />
  ),
  headerComponentsBeforeSearch: (
    <ResponsiveSentence
      desktop={
        <>
          Find activities, organisations, and services for adults (aged 18 plus)
          in our{" "}
          <AStrong href="https://directory.buckinghamshire.gov.uk/">
            BOD directory
          </AStrong>
        </>
      }
      mobile={
        <>
          For adults visit our{" "}
          <AStrong href="https://directory.buckinghamshire.gov.uk/">
            BOD directory
          </AStrong>
        </>
      }
    />
  ),
  ServiceCardFooter: args => {
    const isFamilyHub =
      args?.meta.filter(m => m.key === "family-hub" && m.value === "Yes")
        .length > 0
    return <>{isFamilyHub && <FamilyHubsNetworkTag />}</>
  },
  DetailDialogExtra: ({ service }) => {
    if (service.meta?.some(m => m.key === "family-hub" && m.value === "Yes")) {
      return <FamilyHubsNetworkDetailDialog />
    } else {
      return null
    }
  },
}

export default vars_bfis
