/* eslint-disable no-unused-vars */
import React, { useRef } from "react"

import { Layout, useSettingsState } from "@outpost-platform/scout-components"

import { Outlet, Link } from "react-router-dom"
import Debugger from "./components/Debugger"
const App = ({ children }) => {
  const scrollTarget = useRef(null)
  const {
    settings: { embedded },
  } = useSettingsState()
  return (
    <>
      {embedded ? "embedded" : "not embedded"}

      <Debugger />
      <Link to="pinboard">Pinboard</Link>
      <Layout
        embedded={embedded}
        scrollRef={scrollTarget}
        headerComponents={<>searchbar</>}
        sidebarComponents={<>sidebar</>}
        mainContentComponents={<>main</>}
      />
      <Outlet />
      {children}
    </>
  )
}

export default App
