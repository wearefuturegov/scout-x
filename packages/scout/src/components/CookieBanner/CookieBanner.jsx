import React, { useEffect, useState } from "react"
import { ButtonSolidLinkPrimary } from "~/src/components"

import { getCookie } from "~/src/utils"
import { theme } from "~/src/themes"
import { Inner, Message, Outer } from "./CookieBanner.styles"

const loadAnalytics = () => {
  console.log("loadAnalytics")
  try {
    theme.cookieCallback()
  } catch (error) {
    throw new Error(`You didn't include a callback function`)
  }
}

export default () => {
  const checkCookie = () => {
    // on every page load run this.
    var myCookie = getCookie(theme.cookieName)
    if (myCookie === null) {
      // no cookie - show banner
      setCookieBannerVisible(true)
    } else {
      // we have cookie
      var cookiesAccepted = JSON.parse(myCookie).cookiesAccepted
      var bannerDismissed = JSON.parse(myCookie).bannerDismissed

      // banner already dismissed - hide the banner
      if (!bannerDismissed) {
        setCookieBannerVisible(false)
      }

      if (cookiesAccepted) {
        // we've accepted cookies so load all the things
        loadAnalytics()
      }
    }
  }

  const [cookieBannerVisible, setCookieBannerVisible] = useState(false)

  useEffect(() => {
    checkCookie()
  }, [])

  const handleAccept = () => {
    var cookie = ""
    var date = new Date()
    // Cookie is valid 1 year
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000)
    cookie = {
      bannerDismissed: true,
      cookiesAccepted: true,
    }
    document.cookie = `${theme.cookieName}=${JSON.stringify(
      cookie
    )};expires=${date.toUTCString()};path=/`
    window.location.reload() // reload to load the cookiesss
  }

  return (
    <>
      {cookieBannerVisible && (
        <Outer>
          <Inner>
            <Message>{theme.cookieMessage}</Message>
            <ButtonSolidLinkPrimary onClick={handleAccept}>
              Accept all cookies
            </ButtonSolidLinkPrimary>
          </Inner>
        </Outer>
      )}
    </>
  )
}
