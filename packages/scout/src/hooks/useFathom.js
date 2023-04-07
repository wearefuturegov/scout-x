import { useEffect } from "react"
import { useLocation } from "@reach/router"
import ReactGA from "react-ga"
import { checkCookiesAccepted } from "../lib/cookies"

// TODO re-implement this
const useFathom = () => {
  const location = useLocation()
  const cookiesAccepted = checkCookiesAccepted()

  useEffect(() => {
    if (cookiesAccepted) {
      ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY_ID)
    }
  }, [cookiesAccepted])

  useEffect(() => {
    console.log(location.pathname + location.search)
    if (cookiesAccepted) {
      ReactGA.pageview(location.pathname + location.search)
    }
  }, [cookiesAccepted, location])
}

export default useFathom
