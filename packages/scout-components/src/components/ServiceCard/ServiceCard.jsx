import React from "react"

import { truncate, ServiceCardFooter } from "./../../"
import { useLocation } from "@reach/router"
import { Outer, StyledLink, Name, Description } from "./ServiceCard.styles"

import { useSettingsState } from "./../../"

const ServiceCard = ({ id, name, description, ...service }) => {
  const { settings } = useSettingsState()
  const { search } = useLocation()
  const url = `${settings.basePath || ""}/service/${id}${search}`
  return (
    <Outer>
      <StyledLink to={url}>
        <Name>{name}</Name>
      </StyledLink>
      <Description>{truncate(description, 18)}</Description>
      <ServiceCardFooter {...service} />
    </Outer>
  )
}

export default ServiceCard
