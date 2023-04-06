import React, { useContext } from "react"
import FocusLock, { AutoFocusInside } from "react-focus-lock"
import { RemoveScroll } from "react-remove-scroll"
import {
  DialogContent,
  DialogInner,
  unstable_DialogWrapper as DialogWrapper,
} from "@reach/dialog"
import "@reach/dialog/styles.css"
import close from "./close.svg"
import { useDialogState } from "./../../"

import { StyledDialogOverlay, StyledDialog } from "./Dialog.styles"
import { Icon, CloseButton } from "./Dialog.Shared.styles"

export default ({
  handleDismiss,
  dialogTitle,
  children,
  enableAutoFocus = true,
}) => {
  const { DialogContainerRef } = useDialogState()
  console.log(DialogContainerRef)
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
