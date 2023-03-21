import React, { useRef } from "react"

export const DialogContext = React.createContext()

export const DialogContextProvider = ({ children }) => {
  const portalContainerRef = useRef(null)

  return (
    <DialogContext.Provider value={portalContainerRef}>
      <div ref={portalContainerRef}></div>
      {children}
    </DialogContext.Provider>
  )
}
