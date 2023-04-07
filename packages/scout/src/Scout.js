import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"
import { Router } from "@reach/router"
import App from "./App"
// import DetailDialog from "./components/DetailDialog"
// import PinboardDialog from "./components/PinboardDialog"
import {
  PrintablePinboard,
  PinboardDialog,
  DetailDialog,
} from "@outpost-platform/scout-components"

import { RootProvider } from "./contexts/RootProvider"

import * as ScoutComponents from "@outpost-platform/scout-components"

export function Scout(props) {
  console.log(ScoutComponents)
  const { children, routerProps, ...initialProps } = props
  return (
    <React.StrictMode>
      <RootProvider {...initialProps}>
        <Router {...routerProps}>
          <App path="/" default>
            <DetailDialog path="service/:serviceId" />
            <PinboardDialog path="pinboard" />
          </App>
          <PrintablePinboard path="print/" />
        </Router>
      </RootProvider>
    </React.StrictMode>
  )
}
