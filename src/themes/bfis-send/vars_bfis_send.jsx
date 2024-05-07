import React from "react"
import { vars_bfis } from "./../bfis/vars_bfis"
import SingleStrongLink from "../../components/SingleStrongLink"

export const vars_bfis_send = {
  ...vars_bfis,
  slug: "bfis",
  title: "SEND Local Offer",
  headerComponents: (
    <SingleStrongLink
      text="How to use this directory"
      url="https://familyinfo.buckinghamshire.gov.uk/directory-how-to"
    />
  ),
}

export default vars_bfis_send
