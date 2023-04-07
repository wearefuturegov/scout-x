import React, { useState, useMemo, useContext } from "react"
import { useLoadScript, LoadScript } from "@react-google-maps/api"

import { useAlertApi } from "./../../"

const GoogleStateContext = React.createContext(null)
const libs = ["places"]
// Export the provider, one for the state and another for the API to save on re-renders
const GoogleProvider = ({ children }) => {
  const { triggerAlert } = useAlertApi()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_CLIENT_KEY,
    libraries: libs,
    preventGoogleFontsLoading: false,
  })

  if (loadError) {
    triggerAlert("Error loading google maps", {
      linkText: "See pinboard",
      link: `${settings.basePath || ""}/pinboard${location.search}`,
    })
  }

  const googleState = useMemo(
    () => ({
      mapReady: isLoaded,
    }),
    [isLoaded]
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
