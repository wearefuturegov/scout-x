import fetch from "isomorphic-unfetch"
import queryString from "query-string"

export const fetchResultsByQuery = async query => {

    let {
        keywords, 
        location, 
        lat, 
        lng,
        collection, 
        categories, 
        needs, 
        min_age, 
        max_age,
        only
    } = queryString.parse(query)

    // api expects everything to be a "taxonomy" parameter
    let taxonomies = []
    if(collection) taxonomies.push([].concat(collection))
    if(categories) taxonomies.push([].concat(categories).join(","))
    if(needs) taxonomies.push([].concat(needs).join(","))

    const res = await fetch(`${process.env.REACT_APP_API_HOST}/services?${queryString.stringify({
        keywords,
        location,
        lat,
        lng,
        taxonomies,
        min_age,
        max_age,
        only
    })}`)
    return await res.json()
}