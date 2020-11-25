import taxa from "../data/_taxonomies.json"

export const collectionOptions = taxa

export const subcategoriesOf = parent => parent ? collectionOptions.filter(taxon => taxon.slug === parent)[0].children : []