import React from "react"
import { vars_bfis } from "./../bfis/vars_bfis"

export const vars_bfis_send = {
  ...vars_bfis,
  slug: "bfis",
  title: "BUCKS SEND Local Offer",
  description: (
    <>
      Information, support, childcare and things to do for those with special
      educational needs and disabilities. For Information, support, childcare
      and things to do for families, children and young people please see{" "}
      <a href="https://directory.familyinfo.buckinghamshire.gov.uk/">
        Family information service directory
      </a>
    </>
  ),
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
}

export default vars_bfis_send
