import fetch from "isomorphic-unfetch"
import queryString from "query-string"

export const fetchResultsByQuery = async query => {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(query)}`)
    return await res.json()
}