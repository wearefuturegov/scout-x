import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Router } from "@reach/router"
import DetailDialog from "./components/DetailDialog"
import { GoogleContextProvider } from "./contexts/googleContext"

ReactDOM.render(
  <React.StrictMode>
    <GoogleContextProvider>
      <Router>
        <App path="/" default >
          <DetailDialog path="service/:serviceId"/>
        </App>
      </Router>
    </GoogleContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)