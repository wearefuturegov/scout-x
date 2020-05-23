import fetch from "isomorphic-unfetch"
import queryString from "query-string"

export const fetchResultsByQuery = async query => {
    const newQuery = queryString.parse(query)
    const {collection, taxonomies, needs, ages} = newQuery
    newQuery.taxonomies = [].concat(collection, taxonomies, needs, ages)

    const res = await fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(newQuery)}`)
    return await res.json()
}