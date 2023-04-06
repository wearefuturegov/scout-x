import React from "react"

import { PinboardContextConsumer } from "../../contexts/Pinboard"
import { AlertContextConsumer } from "../../contexts/Alert/AlertContext"
import { AppSettingsContext } from "../../contexts/AppSettings"

import { PinboardButton } from "@outpost-platform/scout-components"

export default props => (
  <AlertContextConsumer>
    {alertContext => (
      <PinboardContextConsumer>
        {pinContext => (
          <PinboardButton
            {...pinContext}
            {...alertContext}
            {...props}
            AppSettings={AppSettingsContext}
          />
        )}
      </PinboardContextConsumer>
    )}
  </AlertContextConsumer>
)
