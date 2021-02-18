import { useEffect } from "react"
import { useLocation } from "@reach/router"
import ReactGA from "react-ga"

const useFathom = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_PROPERTY_ID)
  }, [])

  useEffect(() => {
    console.log(location.pathname + location.search)
    ReactGA.pageview(location.pathname + location.search)
  }, [location])
}

export default useFathom
