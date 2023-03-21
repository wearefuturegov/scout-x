import React, { useEffect } from "react"
import { GoogleMap, useGoogleMap } from "@react-google-maps/api"
import Marker from "./Marker"
import { GoogleContextConsumer } from "../../contexts/Google/GoogleContext"
import styled from "styled-components"

const Outer = styled.section`
  height: 450px;
  border: 1px solid ${props => props.theme.styles.cardShadow};
  margin-bottom: 25px;
  .list-map {
    height: 100%;
  }
`

const BoundSetter = ({ results }) => {
  const map = useGoogleMap()
  useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds()
    if (results.length > 0) {
      results.map(result =>
        bounds.extend({
          lat: result.location.geometry.coordinates[1],
          lng: result.location.geometry.coordinates[0],
        })
      )
      map.fitBounds(bounds)
    }
  })
  return null
}

const ListMap = React.memo(({ results, isLoaded, location, navigate }) => {
  let plottableResults = []
  results.map(result =>
    result.locations.map(location => {
      if (
        location.geometry.coordinates[0] &&
        location.geometry.coordinates[1]
      ) {
        plottableResults.push({
          id: result.id,
          name: result.name,
          location: location,
        })
      }
      return null
    })
  )

  return isLoaded ? (
    <Outer>
      <GoogleMap
        mapContainerClassName="list-map"
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        }}
        zoom={13}
      >
        <BoundSetter results={plottableResults} />
        {plottableResults &&
          plottableResults.map(service => (
            <Marker
              key={service.id}
              service={service}
              navigate={navigate}
              location={location}
            />
          ))}
      </GoogleMap>
    </Outer>
  ) : (
    <p>Map loading...</p>
  )
})

export default props => (
  <GoogleContextConsumer>
    {context => <ListMap isLoaded={context.isLoaded} {...props} />}
  </GoogleContextConsumer>
)
