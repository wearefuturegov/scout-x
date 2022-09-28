import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import { theme } from "./../themes/theme_generator"

/**
 * These calls rely on
 * @param {*} query
 * @returns
 */
export const fetchSiteData = async query => {
  // TODO no point fetching all of these for all sites if they're not used
  return await Promise.allSettled([
    fetchData("taxonomies"),
    fetchData("suitabilities"),
    fetchData("send_needs"),
    fetchData("accessibilities"),
  ])
    .then(data => {
      // console.log("returned from fatching all data", data)
      return data.map(results => {
        if (results.status === "fulfilled") {
          return results.value
        } else {
          return []
        }
      })
    })
    .catch(error => {
      // if there's an error, log it
      console.log(error)
      // return what the site expects so that filters just don't show
      return [...Array(4)].map(x => [])
    })
}

/**
 * Get service data
 * @param {*} query
 * @returns
 */
export const fetchServiceData = async query => {
  const per_page = 20

  let {
    keywords,
    location,
    lat,
    lng,
    collection,
    categories,
    needs,
    accessibilities,
    suitabilities,
    days,
    min_age,
    max_age,
    only,
    page,
  } = queryString.parse(query)

  // api expects collections and categories to both be a "taxonomy" parameter
  let taxonomies = []
  if (collection) taxonomies.push([].concat(collection))
  if (categories) taxonomies.push([].concat(categories).join(","))

  let targetDirectories = []
  if (theme.targets.length > 0)
    targetDirectories.push([].concat(theme.targets).join(","))

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/services?${queryString.stringify({
        targetDirectories,
        keywords,
        location,
        lat,
        lng,
        taxonomies,
        needs,
        accessibilities,
        suitabilities,
        days,
        min_age,
        max_age,
        only,
        page,
        per_page,
      })}`
    )
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

/**
 * Fetching data from outpost itself vs the ol' static files method
 * @param {string} resource
 * @returns {}
 */
export const fetchData = async resource => {
  const directory = [theme.slug]

  try {
    const res = await fetch(
      `${
        process.env.REACT_APP_FILTERS_DATASOURCE
      }/${resource}?${queryString.stringify({
        directory,
      })}`
    )
    return await res.json()
  } catch (err) {
    console.log(err)
    return []
  }
}
