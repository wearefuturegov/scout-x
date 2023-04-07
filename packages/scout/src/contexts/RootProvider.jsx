import React from "react"

// Contexts
import {
  PinboardProvider,
  SettingsProvider,
  AlertProvider,
  GoogleProvider,
  DialogProvider,
} from "@outpost-platform/scout-components"

import { ServiceDataProvider } from "./ServiceData"
import { FilterDataProvider } from "./FilterData"

// TODO cookie provider

// Theme things
import { StyleSheetManager, ThemeProvider } from "styled-components"
import { theme } from "../themes/theme_generator"

// Routing, Nav and History things
import { LocationProvider, Router } from "@reach/router"
import { setScoutHistorySource } from "./../lib/history"
import { AppStateProvider } from "./AppState"

/** Provide values for all the context providers. */
export function RootProvider(props) {
  const { children, settings, routerProps } = props
  const history = setScoutHistorySource(settings.embedded)
  return (
    <SettingsProvider value={settings}>
      <ThemeProvider theme={theme}>
        <StyleSheetManager target={settings.styleSlot}>
          <PinboardProvider>
            <AlertProvider>
              <GoogleProvider>
                <DialogProvider>
                  <LocationProvider history={history}>
                    <AppStateProvider>
                      <ServiceDataProvider>
                        <FilterDataProvider>{children}</FilterDataProvider>
                      </ServiceDataProvider>
                    </AppStateProvider>
                  </LocationProvider>
                </DialogProvider>
              </GoogleProvider>
            </AlertProvider>
          </PinboardProvider>
        </StyleSheetManager>
      </ThemeProvider>
    </SettingsProvider>
  )
}
