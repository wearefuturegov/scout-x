import { useEffect } from "react"
import { useLocation } from "@reach/router"
import * as Fathom from "fathom-client"

const useFathom = () => {
  const location = useLocation()

  useEffect(() => {
    Fathom.load(process.env.REACT_APP_FATHOM_ID, {
      excludedDomains: ["localhost"],
    })
  }, [])

  useEffect(() => {
    Fathom.trackPageview()
  }, [location])
}

export default useFathom
