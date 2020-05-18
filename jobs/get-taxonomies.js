require("dotenv").config()
const fetch = require("isomorphic-unfetch")
const fs = require("fs")

const fetchTaxonomies = async () => {
    console.log("Fetching taxonomy data...")
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/taxonomies`)
    const data = await res.json()
    fs.writeFile("src/data/_taxonomies.json", JSON.stringify(data), err => {
        if (err) return console.log(err)
        console.log("Taxonomy data written successfully ✔")
    })
}

fetchTaxonomies()