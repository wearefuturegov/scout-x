import React, { useState, useMemo, useContext } from "react"
import { useLoadScript } from "@react-google-maps/api"
// import { useCookiesApi } from "./../../"

const GoogleStateContext = React.createContext(null)
const libs = ["places"]
// Export the provider, one for the state and another for the API to save on re-renders
const GoogleProvider = ({ children }) => {
  const [google, setGoogle] = useState([])
  // const { cookiesAccepted } = useCookiesApi()

  const cookiesAccepted = true

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_CLIENT_KEY,
    libraries: libs,
    preventGoogleFontsLoading: false,
  })

  const googleState = useMemo(
    () => ({
      google,
      isLoaded: cookiesAccepted && isLoaded,
    }),
    [setGoogle]
  )

  return (
    <GoogleStateContext.Provider value={googleState}>
      {children}
    </GoogleStateContext.Provider>
  )
}

const useGoogleState = () => {
  const context = useContext(GoogleStateContext)

  if (!context) {
    throw new Error("useGoogleState must be used within the GoogleProvider")
  }

  return context
}

export { GoogleProvider, useGoogleState }
