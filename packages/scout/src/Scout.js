import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"

import { Outlet, Route, Routes } from "react-router-dom"

import { RootProvider } from "./contexts/RootProvider"

import {
  DetailDialog,
  PinboardDialog,
  PrintablePinboard,
} from "@outpost-platform/scout-components"

import App from "./App"
const Test = props => {
  console.log(props)
  return (
    <>
      hey <Outlet />
    </>
  )
}
export function Scout(props) {
  const { children, ...initialProps } = props

  return (
    <React.StrictMode>
      <RootProvider {...initialProps}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="service/:serviceId" element={<DetailDialog />} />
            <Route path="pinboard" element={<PinboardDialog />} />
          </Route>
          <Route path="print" element={<PrintablePinboard />} />
          {/* <App path="/" default>
            <DetailDialog path="service/:serviceId" />
            <PinboardDialog path="pinboard" />
          </App>
          <PrintablePinboard path="print/" /> */}
        </Routes>
      </RootProvider>
    </React.StrictMode>
  )
}
