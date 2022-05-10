import React from "react"
import styled from "styled-components"

const Outer = styled.section`
  height: 450px;
  border: 1px solid ${props => props.theme.styles.cardShadow};
  margin-bottom: 25px;
  .list-map {
    height: 100%;
  }
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }
`

export default ({ results }) => {
  let resultsLatLng = []
  results.map(result =>
    result.locations.map(location => {
      if (
        location.geometry.coordinates[0] &&
        location.geometry.coordinates[1]
      ) {
        resultsLatLng.push([
          `${location.geometry.coordinates[1]},${location.geometry.coordinates[0]}`,
        ])
      }
      return null
    })
  )

  // without access to googles LatLngBounds we're attempting to work out the central point of coords here
  // https://stackoverflow.com/questions/15719951/auto-center-map-with-multiple-markers-in-google-maps-api-v3

  const coordsAsString = resultsLatLng.join("|")
  const filteredtextCoordinatesArray = coordsAsString.split("|")

  let centerLatArray = []
  let centerLngArray = []

  filteredtextCoordinatesArray.map(centerCoords => {
    let centerCoordsArray = centerCoords.split(",")
    if (!isNaN(Number(centerCoordsArray[0]))) {
      centerLatArray.push(Number(centerCoordsArray[0]))
    }

    if (!isNaN(Number(centerCoordsArray[1]))) {
      centerLngArray.push(Number(centerCoordsArray[1]))
    }
    return null
  })

  var centerLatSum = centerLatArray.reduce(function (a, b) {
    return a + b
  })
  var centerLngSum = centerLngArray.reduce(function (a, b) {
    return a + b
  })

  var centerLat = centerLatSum / filteredtextCoordinatesArray.length
  var centerLng = centerLngSum / filteredtextCoordinatesArray.length

  const url =
    `https://maps.googleapis.com/maps/api/staticmap` +
    `?zoom=10` +
    `&center=${centerLat},${centerLng}` +
    `&size=640x450` +
    `&markers=color:black|${resultsLatLng.join("|")}` +
    `&key=${process.env.REACT_APP_GOOGLE_STATIC_MAPS_API_KEY}`

  return (
    <Outer>
      <img
        src={url}
        alt="Static map showing the results of this search on a map. To view an interactive version please accept cookies"
      />
    </Outer>
  )
}
