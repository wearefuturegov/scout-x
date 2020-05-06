import React, { useState } from "react"
import Alert from "../components/Alert"

const AlertContext = React.createContext()

export const AlertContextProvider = ({
    children
}) => {

    const [alerts, setAlerts] = useState([])

    return (
        <AlertContext.Provider
            value={{
                triggerAlert: message => {
                    // Add the new message
                    setAlerts(alerts.concat(message))
                    // Remove the last message after 5 seconds
                    setTimeout(() => {
                        setAlerts(alerts => alerts.slice(1))
                    }, 5000)
                }
            }}
        >
            {children}
            {alerts.length > 0 && alerts.map(alert =>
                <Alert key={alert}>{alert}</Alert>
            )}
        </AlertContext.Provider>
    )
}

export const AlertContextConsumer = AlertContext.Consumer