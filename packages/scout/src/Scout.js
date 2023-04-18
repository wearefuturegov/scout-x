import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import { RootProvider } from "~/src/contexts"

import {
  DetailDialog,
  PinboardDialog,
  PrintablePinboard,
} from "~/src/components"

import App from "./App"
export function ScoutApp(props) {
  const { children, ...initialProps } = props

  return (
    <RootProvider {...initialProps}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="service/:serviceId" element={<DetailDialog />} />
          <Route path="pinboard" element={<PinboardDialog />} />
        </Route>
        <Route path="print" element={<PrintablePinboard />} />
      </Routes>
    </RootProvider>
  )
}

export function Scout(props) {
  const { children, ...initialProps } = props

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ScoutApp {...initialProps} />
        {children}
      </BrowserRouter>
    </React.StrictMode>
  )
}
