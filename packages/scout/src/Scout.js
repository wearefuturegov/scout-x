import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"
import { Link, Router } from "@reach/router"

import { useContext } from "react"

import App from "./App"
import DetailDialog from "./components/DetailDialog"
import PinboardDialog from "./components/PinboardDialog"
import PrintablePinboard from "./components/PrintablePinboard"

import { RootProvider } from "./contexts/RootProvider"
import SimpleDialog from "./components/SimpleDialog"
import { DialogContext } from "./contexts/Dialog"

function Test(props) {
  const { children } = props
  return (
    <>
      <h1>Parent page</h1>
      <TestMenu />
      {children}
    </>
  )
}

function TestPage(props) {
  return (
    <>
      <h1>TestPage</h1>
      <TestMenu />
    </>
  )
}

function TestRef(props) {
  const DialogContainerRef = useContext(DialogContext)
  return <div ref={DialogContainerRef}>Show in ref</div>
}

function TestMenu() {
  return (
    <ul>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/testPage"}>TestPage</Link>
      </li>
      <li>
        <Link to={"/service/1"}>service 1</Link>
      </li>
      <li>
        <Link to={"/testRef"}>TestRef</Link>
      </li>
    </ul>
  )
}

export function Scout(props) {
  const { children, routerProps, ...initialProps } = props

  console.log(props)
  return (
    <React.StrictMode>
      <RootProvider {...initialProps}>
        <Router {...routerProps}>
          {/* <Test path="/" default>
            <TestPage path="testPage" />
            <SimpleDialog path="service/:serviceId" />
            <TestRef path="testRef" />
          </Test> */}

          <App path="/" default>
            <SimpleDialog path="test" />
            <DetailDialog path="service/:serviceId" />
            <PinboardDialog path="pinboard" />
          </App>
          <PrintablePinboard path="print/" />
        </Router>
      </RootProvider>
    </React.StrictMode>
  )
}
