import taxa from "../data/_taxonomies.json"
import sendNeeds from "../data/_send_needs.json"
import accessibilities from "../data/_accessibilities.json"
import days from "../data/_days.json"

export const collectionOptions = taxa

export const sendOptions = sendNeeds

export const accessibilityOptions = accessibilities.sort((a, b) =>
  a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
)

export const daysOptions = days.sort((a, b) => (a.order > b.order ? 1 : -1))

export const subcategoriesOf = parent =>
  parent
    ? collectionOptions.filter(taxon => taxon.slug === parent)[0].children
    : []
