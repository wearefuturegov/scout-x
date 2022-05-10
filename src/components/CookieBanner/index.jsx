import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ButtonLink } from "../Button"

import { getCookie } from "../../lib/cookies"
import { theme } from "./../../themes/theme_generator"

const Outer = styled.header`
  background: ${props => props.theme.styles.white};
  padding: 10px ${props => props.theme.styles.outerSpacing};
`

const Inner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0;
`

const Message = styled.div`
  padding: 0 0 20px 0;

  a {
    text-decoration: none;
    color: ${props => props.theme.styles.link};
    text-decoration: underline;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 3px ${props => props.theme.styles.focus};
    }
    &:hover {
      color: ${props => props.theme.styles.linkHover};
      border-color: ${props => props.theme.styles.linkHover};
    }
    &:active {
      color: ${props => props.theme.styles.linkActive};
      border-color: ${props => props.theme.styles.linkActive};
    }
  }
`

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
            <ButtonLink onClick={handleAccept}>Accept all cookies</ButtonLink>
          </Inner>
        </Outer>
      )}
    </>
  )
}
