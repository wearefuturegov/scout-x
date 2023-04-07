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
