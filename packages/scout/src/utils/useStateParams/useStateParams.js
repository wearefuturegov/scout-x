// see here https://pierrehedkvist.com/posts/react-state-url?slider=41&boolean=false

import queryString from "query-string"
import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useStateParams = (
  initialState,
  paramsName,
  options,
  getCurrentLocation
) => {
  let navigate = useNavigate()
  let location = getCurrentLocation()

  const parsedUrl = queryString.parse(location.search)
  const existingValue = parsedUrl[paramsName]

  // @TODO we can do more checks on the data here
  const deserialize = (value, options) => {
    let { numerical, array, boolean } = options
    if (numerical) return parseInt(value)
    if (boolean) return !!value
    if (array) return value ? [].concat(value) : []
    return value
  }

  const [state, setState] = useState(
    existingValue ? deserialize(existingValue, options) : initialState
  )

  // useEffect(() => {
  //   console.log("useEffect")
  //   // Updates state when user navigates backwards or forwards in browser history
  //   if (existingValue && deserialize(existingValue, options) !== state) {
  //     setState(deserialize(existingValue, options))
  //   }
  // }, [existingValue, options, paramsName, state])

  const onChange = useCallback(
    async s => {
      setState(s)
      const location = getCurrentLocation()

      let currentParams = queryString.parse(location?.search)

      let newUrl = {
        ...currentParams,
        [paramsName]: s,
      }
      if (!s) delete newUrl[paramsName]
      const newParams = queryString.stringify(newUrl)
      // theres a very large chance this promise doesn't ever actually resolve
      await navigate(`/?${newParams}`)
    },
    [getCurrentLocation, navigate, paramsName]
  )

  return [state, onChange]
}

export default useStateParams
