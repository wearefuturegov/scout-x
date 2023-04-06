import React, { useState, useMemo, useContext } from "react"
import { Alert } from "./../../"

const AlertStateContext = React.createContext(null)
const AlertApiContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(false)

  const api = useMemo(
    () => ({
      triggerAlert: (message, options) => {
        // Add the new message
        setAlert({
          message,
          ...options,
        })
        // Remove the last message after 5 seconds
        setTimeout(() => {
          setAlert(false)
        }, 6000)
      },
    }),
    [setAlert]
  )

  return (
    <AlertStateContext.Provider>
      <AlertApiContext.Provider value={api}>
        {children}
        {alert && (
          <Alert link={alert.link} linkText={alert.linkText}>
            {alert.message}
          </Alert>
        )}
      </AlertApiContext.Provider>
    </AlertStateContext.Provider>
  )
}

const useAlertState = () => {
  const context = useContext(AlertStateContext)

  if (!context) {
    throw new Error("useAlertState must be used within the AlertProvider")
  }

  return context
}

const useAlertApi = () => {
  const context = useContext(AlertApiContext)

  if (!context) {
    throw new Error("useAlertApi must be used within the AlertProvider")
  }

  return context
}

export { AlertProvider, useAlertState, useAlertApi }
