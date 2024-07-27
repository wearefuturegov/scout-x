import queryString from "query-string"
import { theme } from "./../themes/theme_generator"
/**
 * Find the next level down of categories
 * @param {*} taxonomies
 * @param {*} parent
 * @returns
 */
export const subcategoriesOf = (taxonomies, parent) => {
  // console.log(taxonomies, parent)
  const subcategories = taxonomies.find(taxon => taxon.slug === parent)
  return subcategories ? subcategories.children : []
}

/**
 * Export the days of the week for filters
 */
export const formatDaysOptions = days =>
  days.sort((a, b) => (a.order > b.order ? 1 : -1))

/**
 * Format accessibility options
 * @param {*} accessibilities
 * @returns
 */
export const formatAccessibilityOptions = accessibilities =>
  accessibilities.sort((a, b) =>
    a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
  )

/**
 * Format suitability options
 * @param {*} suitabilities
 * @returns
 */
export const formatSuitabilityOptions = suitabilities =>
  suitabilities.sort((a, b) =>
    a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
  )

/**
 * Our API only allows for AND queries so we can't send:
 * collection=animal&taxonomies=guineapig&taxonomies=hamster
 * as that will return 0 results
 * but we can send
 * collection=animal&taxonomies=guineapig
 * collection=animal&taxonomies=hamster
 *
 * We store our hierarchy as parent:slug as opposed to an array
 * because of the complications of queryParams as well as the fact
 * that historically the url's for scout have been easily readable
 *
 * Also, we send collection, parent and slug because we're not
 * sending the ID and there could be multiple taxonomies with the same
 * slug so we request the whole tree (outpost has validation that ensures the whole tree is assigned to the service)
 *
 * @param {*} collection
 * @param {*} categories
 */
export const defineQueryTaxonomies = (collection, categories) => {
  const taxonomies = []
  if (categories && collection) {
    categories = [].concat(categories)
    categories.forEach(element => {
      let [parent, slug] = element.split(":")

      if (theme?.parentTaxonomySlug) {
        taxonomies.push(
          [theme.parentTaxonomySlug, collection, parent, slug].filter(
            item => item !== undefined
          )
        )
      } else {
        taxonomies.push(
          [collection, parent, slug].filter(item => item !== undefined)
        )
      }
    })
  } else if (!categories && collection) {
    if (theme?.parentTaxonomySlug) {
      taxonomies.push([theme.parentTaxonomySlug, collection])
    } else {
      taxonomies.push([collection])
    }
  } else if (theme?.parentTaxonomySlug && !categories && !collection) {
    taxonomies.push([theme.parentTaxonomySlug])
  }

  return taxonomies
}

export const removeDuplicateServices = services => {
  return services.filter(
    (service, index, self) => index === self.findIndex(t => t.id === service.id)
  )
}

/**
 * tells us the query type to help with sorting
 */
const getQueryType = query => {
  let { keywords, lat, lng, location } = queryString.parse(query)
  const hasLocation = lat || lng || location
  if (keywords && !hasLocation) {
    return "keyword"
  } else if (keywords === undefined && hasLocation) {
    return "location"
  } else if (keywords && hasLocation) {
    return "keyword_location"
  } else {
    return undefined
  }
}

/**
 * We only do this because we're returning multiple queries
 * @param {*} services
 * @param {*} query
 * @returns
 */
export const sortServices = (services, query) => {
  const queryType = getQueryType(query)
  switch (queryType) {
    case "location":
      return services.sort((a, b) => a.distance_away - b.distance_away)
    case "keyword_location":
      return services.sort((a, b) => a.distance_away - b.distance_away)
    case "keyword":
      return services.sort((a, b) => b.score - a.score)
    default:
      return services.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      )
  }
}
