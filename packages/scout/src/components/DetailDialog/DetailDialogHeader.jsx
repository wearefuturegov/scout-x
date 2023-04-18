import React from "react"

import { DialogStyles } from "./../../components"
import { DetailDialogStyles } from "./../../components"

const DetailDialogHeader = ({ serviceName, organisationName }) => {
  const { Caption } = DetailDialogStyles
  const { Header, Title } = DialogStyles
  return (
    <Header>
      {organisationName && <Caption>{organisationName}</Caption>}
      <Title>{serviceName}</Title>
    </Header>
  )
}

export default DetailDialogHeader
