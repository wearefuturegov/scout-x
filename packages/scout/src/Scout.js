import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"
import { Router } from "@reach/router"

import App from "./App"
import DetailDialog from "./components/DetailDialog"
import PinboardDialog from "./components/PinboardDialog"
import PrintablePinboard from "./components/PrintablePinboard"

import { GoogleContextProvider } from "./contexts/googleContext"
import { AlertContextProvider } from "./contexts/alertContext"
import { PinboardContextProvider } from "./contexts/pinboardContext"

import { ThemeProvider } from "styled-components"
import { theme } from "./themes/theme_generator"

export function Scout() {
  console.log(process.env.NODE_ENV)
  console.log(React.version)
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <PinboardContextProvider>
          <AlertContextProvider>
            <GoogleContextProvider>
              <Router>
                <App path="/" default>
                  <DetailDialog path="service/:serviceId" />
                  <PinboardDialog path="pinboard" />
                </App>
                <PrintablePinboard path="print/" />
              </Router>
            </GoogleContextProvider>
          </AlertContextProvider>
        </PinboardContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}
