import React from "react"
import { vars_bfis } from "./../bfis/vars_bfis"

export const vars_bfis_send = {
  ...vars_bfis,
  slug: "bfis",
  title: "SEND Local Offer",
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
