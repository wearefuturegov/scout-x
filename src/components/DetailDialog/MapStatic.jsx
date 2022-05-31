import React from "react"

export default ({ latitude, longitude, offCenter, zoom, size }) => {
  if (process.env.REACT_APP_GOOGLE_STATIC_MAPS_API_KEY === undefined)
    return null

  const url =
    `https://maps.googleapis.com/maps/api/staticmap` +
    `?center=${latitude},${offCenter ? longitude - 0.006 : longitude}` +
    `&zoom=${zoom}` +
    `&size=${size}` +
    `&markers=color:black|${latitude},${longitude}` +
    `&key=${process.env.REACT_APP_GOOGLE_STATIC_MAPS_API_KEY}`

  return (
    <img
      src={url}
      alt="Static map showing a pin of the service. To view an interactive version please accept cookies"
    />
  )
}
