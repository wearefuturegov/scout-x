import React, { useState, useEffect, useMemo, useContext } from "react"

const PinboardStateContext = React.createContext(null)
const PinboardApiContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const PinboardProvider = ({ children }) => {
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

  const api = useMemo(
    () => ({
      addToPinboard: service => {
        setPinboard([
          ...pinboard,
          {
            ...service,
            distance: null,
          },
        ])
      },
      removeFromPinboard: id => {
        setPinboard(pinboard.filter(service => service.id !== id))
      },
      isInPinboard: id => {
        return pinboard.filter(item => item.id === id).length > 0
      },
    }),
    [setPinboard]
  )

  //TODO is this used?
  // window.isInPinboard = isInPinboard

  return (
    <PinboardStateContext.Provider
      value={{
        pinboard: pinboard,
      }}
    >
      <PinboardApiContext.Provider value={api}>
        {children}
      </PinboardApiContext.Provider>
    </PinboardStateContext.Provider>
  )
}

const usePinboardState = () => {
  const context = useContext(PinboardStateContext)

  if (!context) {
    throw new Error("usePinboardState must be used within the PinboardProvider")
  }

  return context
}

const usePinboardApi = () => {
  const context = useContext(PinboardApiContext)

  if (!context) {
    throw new Error("usePinboardApi must be used within the PinboardProvider")
  }

  return context
}

export { PinboardProvider, usePinboardState, usePinboardApi }
