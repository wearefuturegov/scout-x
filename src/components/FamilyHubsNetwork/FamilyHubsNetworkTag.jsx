import React from "react"
import styled from "styled-components"
import logo from "./family-hubs-icon.png"

// import { theme } from "./../../themes/theme_generator"

const FamilyHubsNetwork = styled.strong`
  margin-right: 15px;
  margin-bottom: 2px;
  background: ${props => props.theme.styles.pale};
  color: #368a8e;
  border-radius: 2px;
  padding: 0px 6px;
  display: flex;
  &:before {
    content: "";
    display: inline-block;
    margin-right: 8px;
    width: 25px;
    height: 24px;
    background-image: url(${logo});
    background-size: cover;
    background-position: center;
  }
`

export const FamilyHubsNetworkTag = () => {
  return <FamilyHubsNetwork>Part of Family Hubs Network</FamilyHubsNetwork>
}
