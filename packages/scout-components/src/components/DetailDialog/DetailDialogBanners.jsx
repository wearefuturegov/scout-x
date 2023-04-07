import React from "react"

import { YellowBanner, Banner } from "./DetailDialogBanners.styles"

import { daysSince } from "./../../"

const DetailDialogBanners = ({ status, updated_at }) => {
  return (
    <>
      {status === "temporarily closed" ? (
        <YellowBanner>
          This service is <strong>temporarily closed</strong>.
        </YellowBanner>
      ) : (
        daysSince(updated_at) > 180 && (
          <Banner>Last updated more than six months ago</Banner>
        )
      )}
    </>
  )
}

export default DetailDialogBanners
