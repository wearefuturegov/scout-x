import fetch from "isomorphic-unfetch"
import queryString from "query-string"

export const fetchResultsByQuery = async query => {
    const newQuery = queryString.parse(query)
    const {collection, taxonomies, needs, ages} = newQuery
    // api expects everything to be a "taxonomy" parameter
    newQuery.taxonomies = [].concat(collection, taxonomies, needs, ages)
    // don't confuse the api with falsy lat/lng parameters
    if(!newQuery.lng) delete newQuery.lng
    if(!newQuery.lat) delete newQuery.lat
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify(newQuery)}`)
    return await res.json()
}