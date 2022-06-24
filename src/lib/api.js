import fetch from "isomorphic-unfetch"
import queryString from "query-string"
import { theme } from "./../themes/theme_generator"

export const fetchResultsByQuery = async query => {
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

  let targets = []
  if (theme.targets.length > 0) targets.push([].concat(theme.targets).join(","))

  const res = await fetch(
    `${process.env.REACT_APP_API_HOST}/services?${queryString.stringify({
      targets,
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
    })}`
  )
  return await res.json()
}
