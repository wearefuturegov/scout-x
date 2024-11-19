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
          The Family Hub network helps families with babies, children, and young
          people from birth until they turn 19 (or up to 25 for those with
          special educational needs and disabilities). As part of the Family Hub
          Network in Buckinghamshire, we are committed to making it easier for
          families to get the help and support they need.
        </p>
      </Body>
    </>
  )
}
