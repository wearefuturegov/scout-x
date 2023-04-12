import React from "react"

import { useSettingsState } from "@outpost-platform/scout-components"
import {
  MemoryRouter,
  BrowserRouter,
  RouterProvider,
  createMemoryRouter,
  createBrowserRouter,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom"
import { createMemoryHistory, createBrowserHistory } from "history"

import App from "./../../App"
import {
  DetailDialog,
  PinboardDialog,
  PrintablePinboard,
} from "@outpost-platform/scout-components"

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "service/:serviceId",
        element: <DetailDialog />,
      },
      {
        path: "pinboard",
        element: <PinboardDialog />,
      },
    ],
  },
  {
    path: "print",
    element: <PrintablePinboard />,
  },
]

const History = ({ children }) => {
  const { settings } = useSettingsState()

  console.log(settings.embedded)

  // createMemoryHistory("/f")
  let history =
    settings.embedded === true
      ? createBrowserHistory()
      : createBrowserHistory({ window })

  if (settings.embedded === true) {
    // router={createMemoryRouter(routes, {
    //   initialEntries: ["/"],
    //   initialIndex: 0, // start at "/"
    // })}
    return <HistoryRouter history={history}>{children}</HistoryRouter>
  } else {
    // router={createBrowserRouter(routes)}
    return <HistoryRouter history={history}>{children}</HistoryRouter>
  }
}

export default History
