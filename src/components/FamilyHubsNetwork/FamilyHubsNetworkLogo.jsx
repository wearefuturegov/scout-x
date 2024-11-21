import React from "react"
import styled from "styled-components"
import text from "./family-hubs-text.png"
import { Crosshead } from "../DetailDialog/DetailDialog.styles"

const FamilyHubsNetwork = styled(Crosshead)`
  &:before {
    content: "";
    display: inline-block;
    margin-right: 8px;
    width: 307px;
    height: 50px;
    background-image: url(${text});
    background-size: cover;
    background-position: center;
  }
  > span {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`

export const FamilyHubsNetworkLogo = () => {
  return (
    <FamilyHubsNetwork>
      <span>Part of Family Hub Network</span>
    </FamilyHubsNetwork>
  )
}
