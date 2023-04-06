import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import { theme } from "./../../themes/theme_generator"

/**
 * Get service data
 * @param {*} query
 * @returns
 */
const getServiceData = async query => {
  //TODO set via site settings
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
    // ${process.env.REACT_APP_API_HOST}
    const res = await fetch(
      `http://localhost:3001/api/v1/services?${queryString.stringify({
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

export default getServiceData
