import { createBrowserHistory } from "history"
import React, { useContext, useState, useLayoutEffect, useMemo } from "react"
import {
  BrowserRouter,
  unstable_HistoryRouter as HistoryRouter,
  Router,
} from "react-router-dom"
import { useSettingsState } from "~/src/contexts"

const HistoryContext = React.createContext(null)
const HistoryApiContext = React.createContext(null)

/**
 * @TODO We need to add in support for history where the params etc may change outside of the app
 * https://github.com/remix-run/react-router/issues/9422#issuecomment-1302564759
 * https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components/70000286#70000286
 * @param {} param0
 * @returns
 */
const HistoryProvider = ({ children }) => {
  const { settings } = useSettingsState()
  // createMemoryHistory()
  let historyObject =
    settings.embedded === true
      ? createBrowserHistory()
      : createBrowserHistory({ window })

  const [history, setHistory] = useState(historyObject)

  const api = useMemo(
    () => ({
      getCurrentLocation: () => {
        const { location } = history
        return location
      },
      rootNavigate: (to, options) => {
        history.push(to, options)
      },
    }),
    [history]
  )

  return (
    <HistoryContext.Provider value={{ history }}>
      <HistoryApiContext.Provider value={api}>
        {/* <Router
          {...props}
          location={state.location}
          navigationType={state.action}
          navigator={history}
        >
          {children}
        </Router> */}
        <BrowserRouter>{children}</BrowserRouter>
        {/* <HistoryRouter history={history}>{children}</HistoryRouter> */}
      </HistoryApiContext.Provider>
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

const useHistoryApi = () => {
  const context = useContext(HistoryApiContext)

  if (!context) {
    throw new Error("useHistoryApi must be used within the HistoryProvider")
  }

  return context
}

export { HistoryProvider, useHistory, useHistoryApi }
