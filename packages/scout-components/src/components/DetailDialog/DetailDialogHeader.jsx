import React from "react"

import { DialogStyles } from "./../../"
import { Caption } from "./DetailDialogHeader.styles"

const DetailDialogHeader = ({ serviceName, organisationName }) => {
  const { Header, Title } = DialogStyles
  return (
    <Header>
      {organisationName && <Caption>{organisationName}</Caption>}
      <Title>{serviceName}</Title>
    </Header>
  )
}

export default DetailDialogHeader
