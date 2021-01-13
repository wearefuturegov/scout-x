import taxa from "../data/_taxonomies.json"
import sendNeeds from "../data/_send_needs.json"

export const collectionOptions = taxa

export const sendOptions = sendNeeds

export const subcategoriesOf = parent =>
  parent
    ? collectionOptions.filter(taxon => taxon.slug === parent)[0].children
    : []
