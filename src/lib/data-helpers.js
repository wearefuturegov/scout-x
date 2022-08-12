/**
 * Find the next level down of categories
 * @param {*} taxonomies
 * @param {*} parent
 * @returns
 */
export const subcategoriesOf = (taxonomies, parent) => {
  if (taxonomies.length === 0) return []
  const subcategories = taxonomies.filter(taxon => taxon.slug === parent)
  return subcategories.length === 0
    ? []
    : taxonomies.filter(taxon => taxon.slug === parent)[0].children
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
