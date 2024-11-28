import React from "react"

// import { theme } from "./../../themes/theme_generator"
import { FamilyHubsNetworkLogo } from "../../components/FamilyHubsNetwork"
import { Body } from "../../components/Dialog/Dialog.styles"

export const FamilyHubsNetworkDetailDialog = () => {
  return (
    <>
      <Body>
        <FamilyHubsNetworkLogo />
        <p>
          The Family Hub Network is a one stop shop for advice, support and
          services to help throughout your family journey, from birth to 19, or
          up to 25 with special educational needs and disabilities (SEND).
        </p>
        <p>
          The network involves professionals and community groups working
          together to ensure that families and residents receive the early help
          and support they need.
        </p>
      </Body>
    </>
  )
}
