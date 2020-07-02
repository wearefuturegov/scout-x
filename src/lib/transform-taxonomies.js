import taxa from "../data/_taxonomies.json"

export const collectionOptions = taxa.filter(taxon => taxon.label === "Categories")[0].children

export const sendOptions = taxa.filter(taxon => taxon.slug === "send-needs")[0].children

export const subcategoriesOf = parent => parent ? collectionOptions.filter(taxon => taxon.slug === parent)[0].children : []