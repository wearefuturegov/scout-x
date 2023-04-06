import React, { useState, useMemo, useContext } from "react"

const CookiesStateContext = React.createContext(null)
const CookiesApiContext = React.createContext(null)

// TODO init cookies in here
// Export the provider, one for the state and another for the API to save on re-renders
const CookiesProvider = ({ children }) => {
  const [cookies, setCookies] = useState(false)

  const api = useMemo(
    () => ({
      cookiesAccepted: () => {
        return true
        // // on every page load run this.
        // var myCookie = getCookie(theme.cookieName)
        // if (myCookie === null) {
        //   // no cookie
        //   return false
        // } else {
        //   // we have cookie
        //   var cookiesAccepted = JSON.parse(myCookie).cookiesAccepted
        //   if (cookiesAccepted) {
        //     return true
        //   }
        //   return false
        // }
      },
      getCookie: name => {
        return {}
        // if (typeof document === "undefined") return ""

        // let dc = document.cookie
        // let prefix = name + "="

        // let begin = dc.indexOf(prefix)
        // if (begin === -1) return null
        // var end = dc.indexOf(";", begin)
        // if (end === -1) end = dc.length

        // return decodeURI(dc.substring(begin + prefix.length, end))
      },
    }),
    [setCookies]
  )

  return (
    <CookiesStateContext.Provider value={{ cookies: cookies }}>
      <CookiesApiContext.Provider value={api}>
        {children}
      </CookiesApiContext.Provider>
    </CookiesStateContext.Provider>
  )
}

const useCookiesState = () => {
  const context = useContext(CookiesStateContext)

  if (!context) {
    throw new Error("useCookiesState must be used within the CookiesProvider")
  }

  return context
}

const useCookiesApi = () => {
  const context = useContext(CookiesApiContext)

  if (!context) {
    throw new Error("useCookiesApi must be used within the CookiesProvider")
  }

  return context
}

export { CookiesProvider, useCookiesState, useCookiesApi }
