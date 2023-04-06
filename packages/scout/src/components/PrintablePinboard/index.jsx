import React from "react"
import { PrintablePinboard } from "@outpost-platform/scout-components"
import { PinboardContextConsumer } from "../../contexts/Pinboard"

export default props => (
  <PinboardContextConsumer>
    {pinContext => <PrintablePinboard {...pinContext} {...props} />}
  </PinboardContextConsumer>
)
