const fetch = require("isomorphic-unfetch")

exports.handler = async (event, context, callback) => {

    const res = await fetch("https://gracious-bartik-fd7170.netlify.app/wards.geojson")
    const data = await res.json()

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: event.queryStringParameters,
            data: data
        })
    }
}