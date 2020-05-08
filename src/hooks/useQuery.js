// A CUSTOM HOOK TO SYNC URL QUERY WITH STATE
// BASED ON: https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f

import { useState, useCallback } from "react"
import queryString from "query-string"
import { useNavigate } from "@reach/router"

const useQuery = (key, initialValue, numerical) => {

    const navigate = useNavigate()

    const applyQueryString = newString => { 
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + newString
        navigate(newUrl, {replace: true})
    }

    const setQueryStringValue = (
        key,
        value,
        query
     ) => {
        const parsedValues = queryString.parse(query)
        const newString = queryString.stringify({
            ...parsedValues,
            [key]: numerical ? parseInt(value) : value
        })
        applyQueryString(`?${newString}`)
    }

    const getQueryStringValue = (key, query) => numerical ? parseInt(queryString.parse(query)[key]) : queryString.parse(query)[key]

    const [value, setValue] = useState(getQueryStringValue(key, window.location.search) || initialValue)

    const onSetValue = useCallback(newValue => {
        setValue(newValue);
        setQueryStringValue(key, newValue, window.location.search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key])
  
    return [value, onSetValue]
}

export default useQuery