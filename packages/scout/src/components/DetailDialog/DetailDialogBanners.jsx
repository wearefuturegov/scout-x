import React from "react"

import { DetailDialogStyles } from "./../../components"

import { daysSince } from "~/src/utils"

const DetailDialogBanners = ({ status, updated_at }) => {
  const { YellowBanner, Banner } = DetailDialogStyles
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
