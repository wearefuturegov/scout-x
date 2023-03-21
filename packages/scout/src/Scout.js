import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import React from "react"
import { Link, Router } from "@reach/router"

import App from "./App"
import DetailDialog from "./components/DetailDialog"
import PinboardDialog from "./components/PinboardDialog"
import PrintablePinboard from "./components/PrintablePinboard"

import { RootProvider } from "./contexts/RootProvider"

function Test(props) {
  const { children } = props
  return (
    <>
      home <Link to={"/service/1"}>TestTwo</Link>
      {children}
    </>
  )
}

function TestTwo(props) {
  const { children } = props
  return (
    <>
      TestTwo <Link to={"/"}>home</Link>
      {children}
    </>
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
            <DetailDialog path="service/:serviceId" />
            <TestTwo path="test" />
          </Test> */}

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
