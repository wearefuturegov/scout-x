import React from "react"
import { vars_bfis } from "./../bfis/vars_bfis"
import ResponsiveSentence from "../../components/ResponsiveSentence"
import { AStrong } from "../../components/A"

export const vars_bfis_send = {
  ...vars_bfis,
  slug: "bfis",
  title: "BUCKS SEND Local Offer",
  serviceHomepageUrl: "https://familyinfo.buckinghamshire.gov.uk/send/",
  socialMedia: vars_bfis.socialMedia.map(sm => {
    if (sm.type === "facebook") {
      return {
        ...sm,
        url: "https://www.facebook.com/BucksLocalOffer/",
      }
    }
    return sm
  }),
  headerComponentsBeforeSearch: (
    <ResponsiveSentence
      desktop={
        <>
          Visit the{" "}
          <AStrong href="https://directory.familyinfo.buckinghamshire.gov.uk/">
            FIS directory
          </AStrong>{" "}
          to find all activities and organisations for families.
        </>
      }
      mobile={
        <>
          For all services visit the{" "}
          <AStrong href="https://directory.familyinfo.buckinghamshire.gov.uk/">
            FIS directory
          </AStrong>
        </>
      }
    />
  ),
  cookieName: "bfis-send-scout",
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
    })(window, document, "script", "dataLayer", "GTM-M9XST7JW")

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
  },
}

export default vars_bfis_send
