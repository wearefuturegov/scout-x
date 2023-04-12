// see here https://pierrehedkvist.com/posts/react-state-url?slider=41&boolean=false

import queryString from "query-string"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useStateParams = (initialState, paramsName, serialize, deserialize) => {
  let location = useLocation()
  let navigate = useNavigate()

  console.log(location)
  // @TODO use queryString library here?
  console.log(
    "useStateParams",
    initialState,
    paramsName,
    serialize,
    deserialize
  )
  // const search = new URLSearchParams(history.location)

  const parsedUrl = queryString.parse(location.search)
  const existingValue = parsedUrl[paramsName]

  const [state, setState] = useState(
    existingValue ? deserialize(existingValue) : initialState
  )

  console.log(
    `existingValue ${paramsName}`,
    existingValue,
    deserialize(existingValue),
    state
  )

  useEffect(() => {
    // Updates state when user navigates backwards or forwards in browser history
    if (existingValue && deserialize(existingValue) !== state) {
      setState(deserialize(existingValue))
    }
  }, [deserialize, existingValue, state])

  const onChange = async s => {
    setState(s)
    let parsedUrlFiltered = parsedUrl
    if (s.length <= 0) {
      parsedUrlFiltered = Object.keys(parsedUrl).filter(
        key => key !== paramsName
      )
    } else {
      parsedUrlFiltered[paramsName] = serialize(s)
    }
    // const searchParams = new URLSearchParams(history.location.search)
    // searchParams.set(paramsName, serialize(s))
    navigate(`?${queryString.stringify(parsedUrlFiltered)}`)
  }

  return [state, onChange]
}

export default useStateParams
