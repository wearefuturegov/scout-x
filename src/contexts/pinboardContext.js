import React, { useState, useEffect } from "react"

const PinboardContext = React.createContext()

export const PinboardContextProvider = ({ children }) => {
  const [pinboard, setPinboard] = useState([])

  // unbake
  useEffect(() => {
    initialisePinboard()
    setPinboard(JSON.parse(window.localStorage.getItem("pinboard")))
  }, [])

  // bake
  useEffect(() => {
    initialisePinboard()
    window.localStorage.setItem("pinboard", JSON.stringify(pinboard))
  }, [pinboard])

  const initialisePinboard = () => {
    if (!window.localStorage.getItem("pinboard")) {
      window.localStorage.setItem("pinboard", JSON.stringify([]))
    }
  }

  const addToPinboard = service => {
    setPinboard([
      ...pinboard,
      {
        ...service,
        distance: null,
      },
    ])
  }

  const removeFromPinboard = id => {
    setPinboard(pinboard.filter(service => service.id !== id))
  }

  const isInPinboard = id => {
    return pinboard.filter(item => item.id === id).length > 0
  }

  window.isInPinboard = isInPinboard

  return (
    <PinboardContext.Provider
      value={{
        pinboard: pinboard,
        addToPinboard: addToPinboard,
        removeFromPinboard: removeFromPinboard,
        isInPinboard: isInPinboard,
      }}
    >
      {children}
    </PinboardContext.Provider>
  )
}

export const PinboardContextConsumer = PinboardContext.Consumer
