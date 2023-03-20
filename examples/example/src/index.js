import React from "react"
import ReactDOM from "react-dom"
import { Scout } from "@outpost-platform/scout"
console.log(React.version)
ReactDOM.render(
  <React.StrictMode>
    This is an example app bringing in Scout directory as a package from
    @outpost-platform/scout
    <Scout />
  </React.StrictMode>,
  document.getElementById("root")
)
