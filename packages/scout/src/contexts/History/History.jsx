import React, {
  useContext,
  useMemo,
  useReducer,
  useState,
  useCallback,
} from "react"

import {
  MemoryRouter,
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
  createBrowserRouter,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom"
import { createMemoryHistory, createBrowserHistory } from "history"
import { useSettingsState } from "@outpost-platform/scout-components"

const HistoryContext = React.createContext(null)

const HistoryProvider = ({ children }) => {
  const { settings } = useSettingsState()
  // createMemoryHistory("/f")
  let historyObject =
    settings.embedded === true
      ? createBrowserHistory()
      : createBrowserHistory({ window })

  const [history, setHistory] = useState(historyObject)

  const getCurrentLocation = () => {
    const { location } = history
    return location
  }

  return (
    <HistoryContext.Provider value={{ getCurrentLocation }}>
      <HistoryRouter history={history}>{children}</HistoryRouter>
    </HistoryContext.Provider>
  )
}

const useHistory = () => {
  const context = useContext(HistoryContext)

  if (!context) {
    throw new Error("useHistory must be used within the HistoryProvider")
  }

  return context
}

export { HistoryProvider, useHistory }
