import taxa from "../data/_taxonomies.json"

console.log(taxa)


export const collectionOptions = taxa.filter(taxon => taxon.label === "Categories")[0].children

export const ageOptions = taxa.filter(taxon => taxon.label === "Age groups")[0].children

export const sendOptions = taxa.filter(taxon => taxon.value === "send-needs")[0].children

export const subcategoriesOf = parent => parent ? collectionOptions.filter(taxon => taxon.value === parent)[0].children : []