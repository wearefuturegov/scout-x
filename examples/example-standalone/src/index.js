import React from "react"
import ReactDOM from "react-dom"
import { Scout } from "@outpost-platform/scout"

settings = {}
settings.targetElement = "#root"
const routerProps = {}
if (settings.basePath && !settings.embedded) {
  settings.basePath = settings.basePath.replace(/\/$/, "") // trim trailing /
  routerProps.basepath = settings.basePath
}

ReactDOM.render(
  <React.StrictMode>
    <Scout settings={settings} routerProps={routerProps} />
  </React.StrictMode>,
  document.querySelector(settings.targetElement)
)
