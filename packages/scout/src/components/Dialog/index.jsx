import React, { useContext } from "react"
import styled from "styled-components"
import FocusLock, { AutoFocusInside } from "react-focus-lock"
import { RemoveScroll } from "react-remove-scroll"
import {
  DialogContent,
  DialogInner,
  unstable_DialogWrapper as DialogWrapper,
} from "@reach/dialog"
import "@reach/dialog/styles.css"
import close from "./close.svg"
import { DialogContext } from "../../contexts/Dialog"

const StyledDialogOverlay = styled("div")`
  background: hsla(0, 0%, 0%, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 100;
`

const StyledDialog = styled(DialogContent)`
  background: white;
  outline: none;
  position: relative;
  padding: 0px;
  margin: 20px auto;
  width: 92vw;
  max-width: 700px;
  min-height: max(60vh, 400px);
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

export default ({
  handleDismiss,
  dialogTitle,
  children,
  enableAutoFocus = true,
}) => {
  const DialogContainerRef = useContext(DialogContext)
  return (
    <DialogWrapper containerRef={DialogContainerRef}>
      <DialogInner
        onDismiss={handleDismiss}
        aria-label={dialogTitle}
        as={StyledDialogOverlay}
        dangerouslyBypassScrollLock={true}
        dangerouslyBypassFocusLock={true}
      >
        <FocusLock
          autoFocus={enableAutoFocus}
          returnFocus={{ preventScroll: !enableAutoFocus }}
          crossFrame
        >
          <RemoveScroll allowPinchZoom enabled={true} noIsolation={true}>
            <DialogContent as={StyledDialog}>
              {handleDismiss && (
                <CloseButton onClick={handleDismiss}>
                  <Icon src={close} alt="Close dialog" />
                </CloseButton>
              )}
              <AutoFocusInside>{children}</AutoFocusInside>
            </DialogContent>
          </RemoveScroll>
        </FocusLock>
      </DialogInner>
    </DialogWrapper>
  )
}

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
