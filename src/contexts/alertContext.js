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
                triggerAlert: (message, link) => {
                    // Add the new message
                    setAlert({
                        message,
                        link
                    })
                    // Remove the last message after 5 seconds
                    setTimeout(() => {
                        setAlert(false)
                    }, 5000)
                }
            }}
        >
            {children}
            {alert &&
                <Alert link={alert.link}>{alert.message}</Alert>
            }
        </AlertContext.Provider>
    )
}

export const AlertContextConsumer = AlertContext.Consumer