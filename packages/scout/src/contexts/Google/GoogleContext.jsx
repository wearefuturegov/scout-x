import React from "react"
import { useLoadScript } from "@react-google-maps/api"
import { checkCookiesAccepted } from "../../lib/cookies"

const GoogleContext = React.createContext()

const libs = ["places"]

export const GoogleContextProvider = ({ children }) => {
  const cookiesAccepted = checkCookiesAccepted()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_CLIENT_KEY,
    libraries: libs,
    preventGoogleFontsLoading: false,
  })

  return (
    <GoogleContext.Provider value={{ isLoaded: cookiesAccepted && isLoaded }}>
      {children}
    </GoogleContext.Provider>
  )
}

export const GoogleContextConsumer = GoogleContext.Consumer
