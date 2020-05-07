import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Router } from "@reach/router"
import DetailDialog from "./components/DetailDialog"
import { GoogleContextProvider } from "./contexts/googleContext"
import { AlertContextProvider } from "./contexts/alertContext"

ReactDOM.render(
  <React.StrictMode>
    <AlertContextProvider>
      <GoogleContextProvider>
        <Router>
          <App path="/" default >
            <DetailDialog path="service/:serviceId"/>
          </App>
        </Router>
      </GoogleContextProvider>
      </AlertContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)