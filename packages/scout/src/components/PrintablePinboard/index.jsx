import React, { useEffect } from "react"
import { truncate } from "../../lib/utils"
import { PinboardContextConsumer } from "../../contexts/Pinboard"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  html{
      max-width: 600px;
      margin: 0 auto;
  }

  ul{
      list-style: none;
      padding-left: 0px;
  }
  li{
      border: 2px solid black;
      margin-bottom: 25px;
      padding: 25px;
      *:first-child{
          margin-top: 0px;
      }
      *:last-child{
          margin-bottom: 0px;
      }
  }
`

const PrintablePinboard = ({ pinboard }) => {
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

export default props => (
  <PinboardContextConsumer>
    {pinContext => <PrintablePinboard {...pinContext} {...props} />}
  </PinboardContextConsumer>
)
