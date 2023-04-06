// A CUSTOM HOOK TO SYNC URL QUERY WITH STATE
// BASED ON: https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f

import { useState, useCallback } from "react"
import queryString from "query-string"
import { useNavigate } from "@reach/router"

const useQuery = (key, initialValue, options = {}) => {
  console.log("useQuery:", key, initialValue, options)
  let { numerical, array, boolean } = options

  const navigate = useNavigate()

  const applyQueryString = newString => {
    // console.log("applyQueryString", newString)
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      newString
    navigate(newUrl, { replace: true })
  }

  const setQueryStringValue = (key, value, query) => {
    // console.log("setQueryStringValue", key, value, query)
    const parsedValues = queryString.parse(query)
    let newObject = {
      ...parsedValues,
      [key]: value,
    }
    if (!value) delete newObject[key]
    const newString = queryString.stringify(newObject)
    applyQueryString(`?${newString}`)
  }

  const getQueryStringValue = (key, query) => {
    // console.log("getQueryStringValue", key, query)
    const value = queryString.parse(query)[key]
    if (numerical) return parseInt(value)
    if (boolean) return !!value
    if (array) return value ? [].concat(value) : []
    return value
  }

  const [value, setValue] = useState(
    getQueryStringValue(key, window.location.search) || initialValue
  )

  const onSetValue = useCallback(
    newValue => {
      setValue(newValue)
      setQueryStringValue(key, newValue, window.location.search)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  )

  return [value, onSetValue]
}

export default useQuery
