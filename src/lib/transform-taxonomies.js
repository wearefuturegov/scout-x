import taxa from "../data/_taxonomies.json"
import sendNeeds from "../data/_send_needs.json"
import accessibilities from "../data/_accessibilities.json"
import days from "../data/_days.json"
import suitabilities from "../data/_suitabilities.json"
import { theme } from "./../themes/theme_generator"

export const collectionOptions = theme.usePresetTaxonomies
  ? theme.presetTaxonomies
  : taxa

export const sendOptions = sendNeeds

export const accessibilityOptions = accessibilities.sort((a, b) =>
  a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
)

export const suitabilityOptions = suitabilities.sort((a, b) =>
  a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
)

export const daysOptions = days.sort((a, b) => (a.order > b.order ? 1 : -1))

export const subcategoriesOf = parent =>
  parent
    ? collectionOptions.filter(taxon => taxon.slug === parent)[0].children
    : []
