import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import { theme } from "./../themes/theme_generator"

import {
  defineQueryTaxonomies,
  sortServices,
  removeDuplicateServices,
} from "./data-helpers"
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
export const fetchServiceData = async (query, page) => {
  let { collection, categories, per_page: query_per_page } = queryString.parse(
    query
  )
  const per_page = query_per_page
    ? parseInt(query_per_page)
    : theme.resultsPerPage || 20

  // api does AND queries only so we need to split the requests up according to the categories
  const taxonomies = defineQueryTaxonomies(collection, categories)

  // return 2x as many results if there are multiple taxonomies to account for any duplicates so pagination works (not foolproof but works for now)
  const results = await Promise.all(
    taxonomies.length > 1
      ? taxonomies.map((taxonomy, i) =>
          fetchServiceDataFromApi(query, taxonomy, per_page * 2, page, i)
        )
      : [fetchServiceDataFromApi(query, taxonomies, per_page * 2, page)]
  )

  const combinedStatus = results.map(r => r?.status).flat()

  let sortedResults = []
  let moreResults = 0
  let estTotalResults = 0

  const combinedResults = results.map(r => r?.content).flat()

  if (combinedResults.length > 0) {
    const deduplicatedResults = removeDuplicateServices(combinedResults, query)
    sortedResults = sortServices(deduplicatedResults, query)
    // moreResults tries to guess if theres going to nbe any more results to show if its 0 then we're no longer returning any results for any queries and can hide load more
    // we use estTotalResults to show the user how many results we think there are going to be
    moreResults = results.reduce((acc, r) => acc + r.content.length, 0)
    estTotalResults = results.reduce((acc, r) => acc + r.totalElements, 0)
  }

  return {
    status: combinedStatus,
    content: sortedResults,
    moreResults,
    estTotalResults,
  }
}

/**
 * Get service data
 * @param {*} query
 * @returns
 */
export const fetchServiceDataFromApi = async (
  query,
  taxonomies,
  per_page,
  page,
  query_num = 0
) => {
  let {
    keywords,
    location,
    lat,
    lng,
    needs,
    accessibilities,
    suitabilities,
    start_date,
    end_date,
    days,
    start_time,
    end_time,
    day,
    min_age,
    max_age,
    only,
    meta,
  } = queryString.parse(query)

  let directories = []
  if (theme.targets.length > 0) directories = theme.targets

  const url = `${
    process.env.REACT_APP_API_HOST
  }/services?${queryString.stringify({
    directories,
    keywords,
    location,
    lat,
    lng,
    taxonomies,
    needs,
    accessibilities,
    suitabilities,
    start_date,
    end_date,
    days,
    start_time,
    end_time,
    day,
    min_age,
    max_age,
    only,
    meta,
    page,
    per_page,
  })}`

  // console.log("fetchServiceDataFromApi", url)

  try {
    const res = await fetch(url)

    // Handle non-2xx HTTP responses
    if (!res.ok) {
      // const errorData = await res.json()
      // console.log(errorData)
      return { content: [], status: res.status }
    }

    const results = await res.json()
    // add query number to each result so we can track which query it came from
    results.content = results.content.map(r => (r = { ...r, query_num }))
    results.status = res.status
    return results
  } catch (err) {
    console.error("An error occurred fetching data from Outpost API")
    // console.log(err)
    return { content: [], status: 400 }
  }
}

/**
 * Fetching data from outpost itself vs the ol' static files method
 * @param {string} resource
 * @returns {}
 */
export const fetchData = async resource => {
  let filters = ""
  if (resource === "taxonomies" && theme.targets.length > 0) {
    filters = `?${queryString.stringify(
      { directories: theme.targets },
      { arrayFormat: "bracket" }
    )}`
  }

  const url = `${process.env.REACT_APP_FILTERS_DATASOURCE}/${resource}${filters}`

  // console.log("fetchData", resource, url)
  try {
    const res = await fetch(url)
    return await res.json()
  } catch (err) {
    console.error("An error occurred fetching data from Outpost")
    // console.log(err)
    return []
  }
}
