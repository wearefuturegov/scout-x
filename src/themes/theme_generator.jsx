import { theme_generic } from "./generic/theme_generic"
import { theme_bfis } from "./bfis/theme_bfis"
import { theme_bod } from "./bod/theme_bod"
import { vars_generic } from "./generic/vars_generic"
import { vars_bfis } from "./bfis/vars_bfis"
import { vars_bod } from "./bod/vars_bod"
import validThemes from "./valid-themes.json"
const valid = validThemes.valid
require("dotenv").config()

/**
 * If for some reason REACT_APP_THEME is undefined we return 'generic' as the default
 * Don't forget that if you make major changes to look in jobs/add-public-files too
 * @returns string
 */
export const getThemeLabel = () => {
  return process.env.hasOwnProperty("REACT_APP_THEME") &&
    valid.find(e => e.label === process.env.REACT_APP_THEME.toLowerCase())
    ? process.env.REACT_APP_THEME.toLowerCase()
    : "generic"
}

/**
 * This was added incase we couldn't support bfis/bod etc on the api side
 *
 * @deprecated
 */
export const getThemeName = () => {
  return process.env.hasOwnProperty("REACT_APP_THEME") &&
    valid.find(e => e.label === process.env.REACT_APP_THEME.toLowerCase())
    ? valid.find(e =>
        e.label === process.env.REACT_APP_THEME.toLowerCase() ? e.name : false
      )
    : "Generic"
}

/**
 * Determine whether or not we show custom taxonomies.
 * We can overwrite it with env vars if we want.
 * @returns
 */
const determineUsePresetTaxonomies = vars => {
  if (process.env.REACT_APP_USE_PRESET_TAXONOMIES === "true") {
    return true
  }

  if (vars.hasOwnProperty("usePresetTaxonomies")) {
    return vars.usePresetTaxonomies
  } else {
    return false
  }
}

/**
 * Ensures we have a standard theme object.
 * @param {*} vars object
 * @param {*} theme_vars object
 * @returns object
 */
const generate_theme = (vars, theme_vars) => {
  return {
    slug: vars.slug,
    title: vars.hasOwnProperty("title") ? vars.title : "",
    contactEmail: vars.hasOwnProperty("contactEmail")
      ? vars.contactEmail
      : false,
    contactPhone: vars.hasOwnProperty("contactPhone")
      ? vars.contactPhone
      : false,
    serviceHomepageUrl: vars.serviceHomepageUrl,
    organisation: vars.hasOwnProperty("organisation") ? vars.organisation : "",
    organisationUrl: vars.organisationUrl,
    tagline: vars.hasOwnProperty("tagline") ? vars.tagline : "",
    beta: vars.hasOwnProperty("beta") ? vars.beta : false,
    headerLogo: vars.headerLogo,
    footerNav: vars.footerNav,
    outpostLoginUrl: process.env.REACT_APP_OUTPOST_LOGIN_URL,
    outpostRegisterUrl: process.env.REACT_APP_OUTPOST_REGISTER_URL,
    feedbackUrl: process.env.REACT_APP_FEEDBACK_URL,
    scoutUrl: process.env.REACT_APP_SCOUT_URL,
    mapSwitchSmall: vars.hasOwnProperty("mapSwitchSmall")
      ? vars.mapSwitchSmall
      : true,
    filterOrder: vars.hasOwnProperty("filterOrder") ? vars.filterOrder : {},
    usePresetTaxonomies: determineUsePresetTaxonomies(vars),
    presetTaxonomies: vars.hasOwnProperty("presetTaxonomies")
      ? vars.presetTaxonomies
      : {},
    styles: {
      link: theme_vars.link,
      linkHover: theme_vars.linkHover,
      linkActive: theme_vars.linkActive,

      linkBackground: theme_vars.linkBackground,

      textBackground: theme_vars.textBackground,

      toggleColor: theme_vars.toggleColor,

      text: theme_vars.text,
      grey: theme_vars.grey,
      pale: theme_vars.pale,
      offwhite: theme_vars.offwhite,
      white: theme_vars.white,

      grey2: theme_vars.grey2,

      cardShadow: theme_vars.cardShadow,

      green: theme_vars.green,
      focus: theme_vars.focus,
      error: theme_vars.error,

      darkGreen: theme_vars.darkGreen,
      darkYellow: theme_vars.darkYellow,

      maxWidth: theme_vars.maxWidth,
      outerSpacing: theme_vars.outerSpacing,
      breakpointS: theme_vars.breakpointS,
      breakpointM: theme_vars.breakpointM,
      breakpointL: theme_vars.breakpointL,
    },
  }
}

var currentTheme = theme_generic
var currentVars = vars_generic

switch (getThemeLabel()) {
  case "generic":
    currentTheme = theme_generic
    currentVars = vars_generic
    break
  case "bfis":
    currentTheme = theme_bfis
    currentVars = vars_bfis
    break
  case "bod":
    currentTheme = theme_bod
    currentVars = vars_bod
    break
  default:
    currentTheme = theme_generic
    currentVars = vars_generic
    break
}

export const theme = generate_theme(currentVars, currentTheme)
