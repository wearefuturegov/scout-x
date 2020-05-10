import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Router } from "@reach/router"
import { GoogleContextProvider } from "./contexts/googleContext"
import { AlertContextProvider } from "./contexts/alertContext"
import { PinboardContextProvider } from "./contexts/pinboardContext"

const DetailDialog = lazy(() => import("./components/DetailDialog"))
const PinboardDialog = lazy(() => import("./components/PinboardDialog"))

const loader = () => <p>Loading...</p>

ReactDOM.render(
  <React.StrictMode>
    <PinboardContextProvider>
      <AlertContextProvider>
        <GoogleContextProvider>
        <Suspense fallback={loader}>
          <Router>
            <App path="/" default >
                <DetailDialog path="service/:serviceId"/>
                <PinboardDialog path="pinboard"/>
            </App>
          </Router>
          </Suspense>
        </GoogleContextProvider>
      </AlertContextProvider>
    </PinboardContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)