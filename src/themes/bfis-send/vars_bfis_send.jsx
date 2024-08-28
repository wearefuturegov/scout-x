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
}

export default vars_bfis_send
