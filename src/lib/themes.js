import currentTheme from "../data/_themes"

/**
 *
 * @returns Object containing all data for this version
 */
export const getThemeInfo = () => {
  return currentTheme
}

/**
 *
 * @returns string
 */
export const getThemeSlug = () => {
  return currentTheme.slug
}

/**
 *
 * @returns string
 */
export const getThemeTitle = () => {
  return currentTheme.title
}

/**
 * This is the URl for what could be the main service page area for the service (or it coul dbe this directory)
 * @returns string
 */
export const getThemeServiceUrl = () => {
  return currentTheme.serviceUrl
}

/**
 * This is the URl for where scout is installed
 * @returns string
 */
export const getThemeScoutUrl = () => {
  return currentTheme.scoutUrl
}

/**
 *
 * @returns string
 */
export const getThemeOrganisation = () => {
  return currentTheme.organisation
}

/**
 *
 * @returns string (url)
 */
export const getThemeOrganisationUrl = () => {
  return currentTheme.organisationUrl
}

/**
 *
 * @returns string
 */
export const getThemeTagline = () => {
  return currentTheme.tagline
}

/**
 *
 * @returns string
 */
export const getThemeBeta = () => {
  return currentTheme.beta
}
