require("dotenv").config()
const fetch = require("isomorphic-unfetch")
const fs = require("fs")
const validThemes = require("../src/themes/valid-themes.json")
const valid = validThemes.valid
const queryString = require("query-string")

const themeLabel =
  process.env.hasOwnProperty("REACT_APP_THEME") &&
  valid.find(e => e.label === process.env.REACT_APP_THEME.toLowerCase())
    ? process.env.REACT_APP_THEME.toLowerCase()
    : "generic"

const directory = [themeLabel]

const fetchTaxonomies = async resource => {
  console.log(`Fetching ${resource} data...`)
  const res = await fetch(
    `${process.env.FILTERS_DATASOURCE}/${resource}?${queryString.stringify({
      directory,
    })}`
  )
  const data = await res.json()
  fs.writeFile(`src/data/_${resource}.json`, JSON.stringify(data), err => {
    if (err) return console.log(err)
    console.log(`${resource} data written successfully ✔`)
  })
}

if (process.env.FILTERS_DATASOURCE) {
  fetchTaxonomies("taxonomies")
  fetchTaxonomies("send_needs")
  fetchTaxonomies("accessibilities")
  fetchTaxonomies("suitabilities")
} else {
  console.log(
    "FILTERS_DATASOURCE environment config not set. Continuing without updating."
  )
}
