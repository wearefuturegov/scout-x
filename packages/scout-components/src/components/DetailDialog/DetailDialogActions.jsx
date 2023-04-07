import React from "react"

import { ButtonLink, PinboardButton } from "./../../"
import { Actions } from "./DetailDialogActions.styles"

const DetailDialogActions = ({ service }) => {
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
