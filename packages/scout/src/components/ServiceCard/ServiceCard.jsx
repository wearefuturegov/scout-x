import React from "react"

import { ServiceCardFooter } from "~/src/components"
import { truncate } from "~/src/utils"
import { Outer, StyledLink, Name, Description } from "./ServiceCard.styles"

const ServiceCard = ({
  id,
  name,
  description,
  getServiceDetailsPath,
  ...service
}) => {
  const url = getServiceDetailsPath(id)
  console.log(url)
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
