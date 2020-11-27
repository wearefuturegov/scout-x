require("dotenv").config()
const fetch = require("isomorphic-unfetch")
const fs = require("fs")

const fetchTaxonomies = async (resource) => {
    console.log(`Fetching ${resource} data...`)
    const res = await fetch(`${process.env.FILTERS_DATASOURCE}/${resource}`)
    const data = await res.json()
    fs.writeFile(`src/data/_${resource}.json`, JSON.stringify(data), err => {
        if (err) return console.log(err)
        console.log(`${resource} data written successfully ✔`)
    })
}

if(process.env.FILTERS_DATASOURCE){
    fetchTaxonomies("taxonomies")
    fetchTaxonomies("send_needs")
} else {
    console.log("FILTERS_DATASOURCE environment config not set. Continuing without updating.")
}