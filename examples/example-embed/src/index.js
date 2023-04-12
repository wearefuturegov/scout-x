import React from "react"
import ReactDOM from "react-dom"
import { Scout } from "@outpost-platform/scout"
import { Link, Router } from "@reach/router"

function Test(props) {
  return (
    <>
      Test <Link to={"/test"}>TestTwo</Link>
    </>
  )
}

function TestTwo(props) {
  return (
    <>
      TestTwo <Link to={"/"}>home</Link>
    </>
  )
}

function init(settings = {}) {
  // TODO this stuff can go in scout as an export - user shouldn't be worrying about this
  // Where to put the thing
  // https://codesandbox.io/s/react-shadow-forked-lnyk31
  const targetElement = settings.targetElement

  // get our shadow HOST
  const root = document.querySelector(targetElement || "#root")
  // create a shadow root inside it
  const shadow = root.attachShadow({ mode: "open" })
  // create a slot where we will attach the StyleSheetManager
  const styleSlot = document.createElement("section")
  // append the styleSlot inside the shadow
  shadow.appendChild(styleSlot)
  // create the element where we would render our app
  const renderIn = document.createElement("div")
  renderIn.style.fontSize = "16px" // reset font size to ensure consistent sizing when embedded
  // append the renderIn element inside the styleSlot
  styleSlot.appendChild(renderIn)

  // const history = createMemoryOrBrowserHistory(settings.embedded)

  // addCookiesAcceptedListener()

  // store the shadowRoot in context
  settings.shadowRoot = shadow

  const routerProps = {}
  if (settings.basePath && !settings.embedded) {
    settings.basePath = settings.basePath.replace(/\/$/, "") // trim trailing /
    routerProps.basepath = settings.basePath
  }

  settings.styleSlot = styleSlot

  ReactDOM.render(
    <React.StrictMode>
      {/* <Router {...routerProps}>
        <Test path="/" />
        <TestTwo path="/test" />
      </Router> */}

      <Scout settings={settings} routerProps={routerProps} />
    </React.StrictMode>,
    renderIn
  )
}

window.op = window.op || {}
window.op.scout = init

const event = new Event("OPScoutReady")
window.dispatchEvent(event)

export default init
