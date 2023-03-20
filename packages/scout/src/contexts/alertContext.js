import React, { useState } from "react"
import Alert from "../components/Alert"

const AlertContext = React.createContext()

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState(false)

  return (
    <AlertContext.Provider
      value={{
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
      }}
    >
      {children}
      {alert && (
        <Alert link={alert.link} linkText={alert.linkText}>
          {alert.message}
        </Alert>
      )}
    </AlertContext.Provider>
  )
}

export const AlertContextConsumer = AlertContext.Consumer
