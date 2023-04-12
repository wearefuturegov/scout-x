// see here https://pierrehedkvist.com/posts/react-state-url?slider=41&boolean=false

import queryString from "query-string"
import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { parsePath, createPath } from "history"

const useStateParams = (
  initialState,
  paramsName,
  serialize,
  deserialize,
  getCurrentLocation
) => {
  let navigate = useNavigate()
  let location = getCurrentLocation()

  const parsedUrl = queryString.parse(location.search)
  const existingValue = parsedUrl[paramsName]

  const [state, setState] = useState(
    existingValue ? deserialize(existingValue) : initialState
  )

  useEffect(() => {
    console.log("useEffect")
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      console.log(
        `useStateParams useEffect ${[paramsName]} = ${deserialize(
          existingValue
        )} (${existingValue})`
      )

      setState(deserialize(existingValue))
    }
  }, [deserialize, existingValue, paramsName, state])

  const onChange = useCallback(
    async s => {
      console.error(s)
      setState(s)

      // let params = getCurrentLocation()
      // console.log("useStateParams getCurrentLocation", params)
      const location = getCurrentLocation()
      console.log("location", location)
      let currentParams = queryString.parse(location?.search)

      console.log("currentParams", currentParams)

      console.log("things to add/remove", paramsName, s)

      // find the param in the query string

      let newUrl = {
        ...currentParams,
        [paramsName]: s,
      }
      if (!s) delete newUrl[paramsName]
      const newParams = queryString.stringify(newUrl)
      console.log("newParams", newParams)

      console.log(`/?${newParams}`)
      // setNavigateString(newString)
      // setSafeToNavigate(true)
      await navigate(`/?${newParams}`)
      console.log("navigate done???")
    },
    [getCurrentLocation, navigate, paramsName]
  )

  return [state, onChange]
}

export default useStateParams
