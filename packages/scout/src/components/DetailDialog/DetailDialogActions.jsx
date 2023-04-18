import React from "react"

import { ButtonLink, PinboardButton } from "./../../components"

import { DetailDialogStyles } from "./../../components"

const DetailDialogActions = ({ service }) => {
  const { Actions } = DetailDialogStyles
  return (
    <Actions>
      {service.url ? (
        <ButtonLink href={service.url}>Visit website</ButtonLink>
      ) : (
        service.contacts.length === 1 &&
        service.contacts[0].email && (
          <ButtonLink href={`mailto:${service.contacts[0].email}`}>
            Send email
          </ButtonLink>
        )
      )}
      <PinboardButton service={service} location={location} />
    </Actions>
  )
}

export default DetailDialogActions
