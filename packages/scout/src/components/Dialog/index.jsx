import React from "react"
import styled from "styled-components"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import close from "./close.svg"

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

export const Icon = styled.img`
  width: 30px;
  height: 30px;
`

export const CloseButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.styles.pale};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
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

export const Header = styled.header`
  padding: 25px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 45px;
  }
`

export const Body = styled.div`
  padding: 25px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 45px;
  }
  &:nth-of-type(even) {
    background: ${props => props.theme.styles.pale};
  }
`

export const Title = styled.h1`
  color: ${props => props.theme.styles.text};
  margin-bottom: 0px;
  font-size: 1.5rem;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    font-size: 2rem;
  }
`
