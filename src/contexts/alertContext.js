import React, { useState } from "react"
import Alert from "../components/Alert"

const AlertContext = React.createContext()

export const AlertContextProvider = ({
    children
}) => {

    const [alert, setAlert] = useState(false)

    return (
        <AlertContext.Provider
            value={{
                triggerAlert: message => {
                    // Add the new message
                    setAlert(message)
                    // Remove the last message after 5 seconds
                    setTimeout(() => {
                        setAlert(false)
                    }, 5000)
                }
            }}
        >
            {children}
            {alert &&
                <Alert>{alert}</Alert>
            }
        </AlertContext.Provider>
    )
}

export const AlertContextConsumer = AlertContext.Consumer