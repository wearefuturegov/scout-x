import React from "react"
import { useLoadScript } from "@react-google-maps/api"

const GoogleContext = React.createContext()

const libs = ["places"]

export const GoogleContextProvider = ({
    children
}) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_CLIENT_KEY,
        libraries: libs
    })

    return (
        <GoogleContext.Provider
            value={{
                isLoaded: isLoaded
            }}
        >
            {children}
        </GoogleContext.Provider>
    )
}

export const GoogleContextConsumer = GoogleContext.Consumer