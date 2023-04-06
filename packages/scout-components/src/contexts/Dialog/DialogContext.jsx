import React, { useState, useMemo, useContext, useRef } from "react"

const DialogStateContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState()

  const DialogContainerRef = useRef()

  const DialogState = useMemo(
    () => ({
      DialogContainerRef,
    }),
    [setDialog]
  )

  return (
    <DialogStateContext.Provider value={DialogState}>
      <div ref={DialogContainerRef}></div>
      {children}
    </DialogStateContext.Provider>
  )
}

const useDialogState = () => {
  const context = useContext(DialogStateContext)

  if (!context) {
    throw new Error("useDialogState must be used within the DialogProvider")
  }

  return context
}

export { DialogProvider, useDialogState }
