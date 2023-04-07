import React, { useState } from "react"

import { DialogStyles } from "./../../"
import fetch from "isomorphic-unfetch"
import { ButtonSolid } from "@outpost-platform/scout-components"
import close from "./close.svg"
import { useAlertApi } from "./../../"
import { StyledDialog, Title, Field, Label, Input } from "./ShareDialog.styles"

const ShareDialog = ({ pinboard, isOpen, handleDismiss }) => {
  const [sending, setSending] = useState(false)
  const { triggerAlert } = useAlertApi()

  const [email, setEmail] = useState("")

  const { CloseButton, Icon } = DialogStyles
  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/.netlify/functions/send-email", {
        method: "post",
        body: JSON.stringify({
          email: email,
          pins: pinboard,
        }),
      })
      if (!res.ok) throw Error(res.statusText)
      triggerAlert(`Sent to ${email}`)
      setSending(false)
      handleDismiss()
    } catch (e) {
      triggerAlert("Couldn't send email. Please try again later.")
    }
  }

  return (
    <StyledDialog
      isOpen={isOpen}
      onDismiss={handleDismiss}
      aria-label="Share dialog"
    >
      <CloseButton onClick={handleDismiss}>
        <Icon src={close} alt="Close dialog" />
      </CloseButton>

      <Title>Share pinned services by email</Title>
      <form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            required={true}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Field>
        <ButtonSolid disabled={sending}>Send email</ButtonSolid>
      </form>
    </StyledDialog>
  )
}

export default ShareDialog
