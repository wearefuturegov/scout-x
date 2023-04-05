import React, { createContext, useRef } from "react"

export const DialogContext = createContext()

export const DialogContextProvider = ({ children }) => {
  const DialogContainerRef = useRef()
  return (
    <DialogContext.Provider value={DialogContainerRef}>
      <div ref={DialogContainerRef}></div>
      {children}
    </DialogContext.Provider>
  )
}
