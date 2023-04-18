import React from "react"

// @TODO cookie provider
// Contexts
import {
  AlertProvider,
  AppStateProvider,
  DialogProvider,
  GoogleProvider,
  ServiceDataProvider,
  PinboardProvider,
  SettingsProvider,
  FilterDataProvider,
  CookiesProvider,
} from "~/src/contexts"

// Theme things
import { StyleSheetManager, ThemeProvider } from "styled-components"
import { theme } from "~/src/themes"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

/** Provide values for all the context providers. */
export function RootProvider(props) {
  const { children, settings } = props
  const queryClient = new QueryClient()
  return (
    <SettingsProvider value={settings}>
      {/* <HistoryProvider> */}
      <CookiesProvider>
        <AppStateProvider>
          <ThemeProvider theme={theme}>
            <StyleSheetManager target={settings.styleSlot}>
              <PinboardProvider>
                <AlertProvider>
                  <GoogleProvider>
                    <DialogProvider>
                      <QueryClientProvider client={queryClient}>
                        <ServiceDataProvider>
                          <FilterDataProvider>{children}</FilterDataProvider>
                        </ServiceDataProvider>
                        <ReactQueryDevtools initialIsOpen />
                      </QueryClientProvider>
                    </DialogProvider>
                  </GoogleProvider>
                </AlertProvider>
              </PinboardProvider>
            </StyleSheetManager>
          </ThemeProvider>
        </AppStateProvider>
      </CookiesProvider>
      {/* </HistoryProvider> */}
    </SettingsProvider>
  )
}
