// see here https://pierrehedkvist.com/posts/react-state-url?slider=41&boolean=false
import queryString from "query-string"
import { useCallback, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import isEqual from "lodash/isEqual"

/**
 *
 * We use this hook to keep the appstate and url params in sync.
 * We send it getCurrentLocation because we can't access contexts in
 * this hook and we have some issues with contexts so we're being
 * super specific with it all
 *
 * @param {*} initialState
 * @param {*} paramsName
 * @param {*} options
 * @param {*} getCurrentLocation
 * @returns [state, onChange]
 */
const useStateParams = (
  initialState,
  paramsName,
  options,
  getCurrentLocation
) => {
  let navigate = useNavigate()
  let location = useLocation() // get location from app context not the browser window
  const parsedUrl = queryString.parse(location.search)
  const existingValue = parsedUrl[paramsName]

  // @TODO we can do more checks on the data here
  const deserialize = useCallback((value, options) => {
    let { numerical, array, boolean } = options
    if (numerical) return parseInt(value)
    if (boolean) return !!value
    if (array) return value ? [].concat(value) : []
    return value
  })

  const [state, setState] = useState(
    existingValue ? deserialize(existingValue, options) : initialState
  )

  const existingValueMatchesState = useCallback((value, options) => {
    let { numerical, array, boolean } = options

    if (numerical) return parseInt(value) === parseInt(state)
    if (boolean) return value === state
    if (array) return isEqual(value.sort(), state.sort())
    return value === state
  })

  // Updates state when user navigates backwards or forwards in browser history
  useEffect(() => {
    if (
      existingValue &&
      !existingValueMatchesState(deserialize(existingValue, options), options)
    ) {
      console.log(`${paramsName} is not the same as state rn`)
      setState(deserialize(existingValue, options))
    }
  }, [
    deserialize,
    existingValue,
    existingValueMatchesState,
    options,
    paramsName,
    state,
  ])

  const onChange = useCallback(
    async s => {
      setState(s)

      let currentParams = queryString.parse(location?.search)

      let newUrl = {
        ...currentParams,
        [paramsName]: s,
      }
      if (!s) delete newUrl[paramsName]
      const newParams = queryString.stringify(newUrl)

      console.log("ONCHANGE: ", newParams, newUrl)

      // theres a very large chance this promise doesn't ever actually resolve
      await navigate(`/?${newParams}`)
    },
    [location.search, navigate, paramsName]
  )

  return [state, onChange]
}

export default useStateParams
