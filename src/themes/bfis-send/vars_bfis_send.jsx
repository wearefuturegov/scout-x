import { vars_bfis } from "./../bfis/vars_bfis"

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
}

export default vars_bfis_send
