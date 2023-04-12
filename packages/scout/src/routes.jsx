import React from "react"
import App from "./App"
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
