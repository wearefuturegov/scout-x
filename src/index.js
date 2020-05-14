import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Router } from "@reach/router"
import DetailDialog from "./components/DetailDialog"
import PinboardDialog from "./components/PinboardDialog"
import PrintablePinboard from "./components/PrintablePinboard"
import { GoogleContextProvider } from "./contexts/googleContext"
import { AlertContextProvider } from "./contexts/alertContext"
import { PinboardContextProvider } from "./contexts/pinboardContext"

ReactDOM.render(
  <React.StrictMode>
    <PinboardContextProvider>
      <AlertContextProvider>
        <GoogleContextProvider>
          <Router>
            <App path="/">
              <DetailDialog path="service/:serviceId"/>
              <PinboardDialog path="pinboard"/>
            </App>
            <PrintablePinboard path="print/"/>
          </Router>
        </GoogleContextProvider>
      </AlertContextProvider>
    </PinboardContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)