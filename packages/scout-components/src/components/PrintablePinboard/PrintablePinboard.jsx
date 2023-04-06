import React, { useEffect } from "react"
import { truncate } from "./../../"
import { GlobalStyle } from "./PrintablePinboard.styles"

import { usePinboardState } from "./../../"

const PrintablePinboard = () => {
  const { pinboard } = usePinboardState()

  useEffect(() => {
    if (pinboard.length > 0) {
      window.print()
    }
    window.addEventListener("afterprint", () => {
      window.close()
    })
  }, [pinboard])

  return (
    <>
      <GlobalStyle />
      <h1>Your pinned services</h1>
      <ul>
        {pinboard.map(pin => (
          <li>
            <h2>{pin.name}</h2>
            <p>{truncate(pin.description, 35)}</p>
            <p>
              <strong>{pin.url}</strong>
            </p>
            <p>
              <strong>{pin.email}</strong>
            </p>
          </li>
        ))}
      </ul>
      <p>
        We regularly check and update these community services, but can’t
        guarantee that they will always be accurate.
      </p>
      <p>
        You may need a referral for some activities and groups. Contact the
        organiser if unsure.
      </p>
    </>
  )
}

export default PrintablePinboard
