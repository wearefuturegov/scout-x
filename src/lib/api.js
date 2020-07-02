import fetch from "isomorphic-unfetch"
import queryString from "query-string"

export const fetchResultsByQuery = async query => {

    const {collection, categories, needs, ages, location, keywords, lat, lng, only, min_age, max_age} = queryString.parse(query)

    // api expects everything to be a "taxonomy" parameter
    let taxonomies = []
    if(collection) taxonomies.push([].concat(collection))
    if(categories) taxonomies.push([].concat(categories).join(","))
    if(needs) taxonomies.push([].concat(needs).join(","))
    if(ages) taxonomies.push([].concat(ages).join(","))

    // don't confuse the api with falsy lat/lng parameters
    // if(!newQuery.lng) delete newQuery.lng
    // if(!newQuery.lat) delete newQuery.lat

    const res = await fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify({
        taxonomies,
        location,
        keywords,
        lat,
        lng,
        only
    })}`)
    return await res.json()
}