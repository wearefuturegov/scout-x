import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import { theme } from "./../../themes/theme_generator"

/**
 * Fetching data from outpost itself vs the ol' static files method
 * @param {string} resource
 * @returns {}
 */
export const fetchData = async resource => {
  const directory = [theme.slug]

  try {
    // ${process.env.REACT_APP_FILTERS_DATASOURCE}
    const res = await fetch(
      `http://localhost:3000/api/v1/${resource}?${queryString.stringify({
        directory,
      })}`
    )
    return await res.json()
  } catch (err) {
    console.log(err)
    return []
  }
}

/**
 * Get service data
 * @param {*} query
 * @returns
 */
const getFilterData = async query => {
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

export default getFilterData
