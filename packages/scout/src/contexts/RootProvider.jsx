import React from "react"

// Contexts
import { AlertContextProvider } from "./Alert"
import { AppSettingsContextProvider } from "./AppSettings"
import { DialogContextProvider } from "./Dialog"
import { GoogleContextProvider } from "./Google"
import { PinboardContextProvider } from "./Pinboard"

// Theme things
import { StyleSheetManager, ThemeProvider } from "styled-components"
import { theme } from "../themes/theme_generator"

// Routing, Nav and History things
import { LocationProvider, Router } from "@reach/router"
import { setScoutHistorySource } from "./../lib/history"

/** Provide values for all the context providers. */
export function RootProvider(props) {
  const { children, settings, routerProps } = props
  const history = setScoutHistorySource(settings.embedded)
  return (
    <ThemeProvider theme={theme}>
      <StyleSheetManager target={settings.styleSlot}>
        <PinboardContextProvider>
          <GoogleContextProvider>
            <DialogContextProvider>
              <AppSettingsContextProvider value={settings}>
                <LocationProvider history={history}>
                  <AlertContextProvider>{children}</AlertContextProvider>
                </LocationProvider>
              </AppSettingsContextProvider>
            </DialogContextProvider>
          </GoogleContextProvider>
        </PinboardContextProvider>
      </StyleSheetManager>
    </ThemeProvider>
  )
}
