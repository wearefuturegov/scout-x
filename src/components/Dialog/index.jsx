import React from "react"
import styled from "styled-components"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import close from "./close.svg"
import { Icon, CloseButton } from "./Dialog.styles"

const StyledDialog = styled(Dialog)`
  position: relative;
  padding: 0px;
  margin: 20px auto;
  width: 92vw;
  max-width: 700px;
  &:hover {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin: 60px auto;
  }
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

export default ({ handleDismiss, dialogTitle, children }) => (
  <StyledDialog onDismiss={handleDismiss} aria-label={dialogTitle}>
    <CloseButton onClick={handleDismiss}>
      <Icon src={close} alt="Close dialog" />
    </CloseButton>
    {children}
  </StyledDialog>
)
