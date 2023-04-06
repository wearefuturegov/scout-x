import React, { useState } from "react"
import styled from "styled-components"

import { Dialog } from "@reach/dialog"
import { CloseButton, Icon } from "../Dialog"
import fetch from "isomorphic-unfetch"
import { ButtonSolid } from "@outpost-platform/scout-components"
import close from "./close.svg"
import { AlertContextConsumer } from "../../contexts/Alert"

const StyledDialog = styled(Dialog)`
  position: relative;
  width: 95vw;
  max-width: 400px;
  animation: splat 0.15s ease-out;
  @keyframes splat {
    from {
      opacity: 0;
      transform: scale(0.99);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Title = styled.h2`
  margin-bottom: 25px;
`

const Field = styled.div`
  position: relative;
  margin-bottom: 25px;
`

const Label = styled.label`
  display: block;
  color: ${props => props.theme.styles.text};
  cursor: pointer;
  margin-bottom: 5px;
`

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: 100%;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    opacity: 0.3;
  }
`

const ShareDialog = ({ pinboard, isOpen, handleDismiss, triggerAlert }) => {
  const [sending, setSending] = useState(false)

  const [email, setEmail] = useState("")

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

export default props => (
  <AlertContextConsumer>
    {alertContext => <ShareDialog {...alertContext} {...props} />}
  </AlertContextConsumer>
)
