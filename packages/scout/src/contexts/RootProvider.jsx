import React from "react"

// Contexts
import {
  AlertProvider,
  DialogProvider,
  GoogleProvider,
  PinboardProvider,
  SettingsProvider,
} from "@outpost-platform/scout-components"

import { BrowserRouter } from "react-router-dom"

// TODO cookie provider

// Theme things
import { StyleSheetManager, ThemeProvider } from "styled-components"
import { theme } from "../themes/theme_generator"

// Routing, Nav and History things
import { AppStateProvider } from "./AppState"

// import History from "../components/History"
import { HistoryProvider } from "./History"

/** Provide values for all the context providers. */
export function RootProvider(props) {
  const { children, settings } = props
  return (
    <SettingsProvider value={settings}>
      <HistoryProvider>
        <AppStateProvider>
          <ThemeProvider theme={theme}>
            <StyleSheetManager target={settings.styleSlot}>
              <PinboardProvider>
                <AlertProvider>
                  <GoogleProvider>
                    <DialogProvider>
                      {/* <ServiceDataProvider> */}
                      {/* <FilterDataProvider> */}
                      {/* <LocationProvider history={history}> */}

                      {children}
                      {/* </LocationProvider> */}
                      {/* </FilterDataProvider> */}
                      {/* </ServiceDataProvider> */}
                    </DialogProvider>
                  </GoogleProvider>
                </AlertProvider>
              </PinboardProvider>
            </StyleSheetManager>
          </ThemeProvider>
        </AppStateProvider>
      </HistoryProvider>
    </SettingsProvider>
  )
}
