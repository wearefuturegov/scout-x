import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Router } from "@reach/router"
import DetailDialog from "./components/DetailDialog"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App path="/" default >
        <DetailDialog path="service/:serviceId"/>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)