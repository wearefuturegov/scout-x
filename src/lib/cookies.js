import { theme } from "./../themes/theme_generator"

export const getCookie = name => {
  if (typeof document === "undefined") return ""

  let dc = document.cookie
  let prefix = name + "="

  let begin = dc.indexOf(prefix)
  if (begin === -1) return null
  var end = dc.indexOf(";", begin)
  if (end === -1) end = dc.length

  return decodeURI(dc.substring(begin + prefix.length, end))
}

export const checkCookiesAccepted = () => {
  // on every page load run this.
  var myCookie = getCookie(theme.cookieName)
  if (myCookie === null) {
    // no cookie
    return false
  } else {
    // we have cookie
    var cookiesAccepted = JSON.parse(myCookie).cookiesAccepted
    if (cookiesAccepted) {
      return true
    }
    return false
  }
}
