import React, { useEffect } from "react"
import { GoogleMap, useGoogleMap } from "@react-google-maps/api"
import Marker from "./Marker"
import { GoogleContextConsumer } from "../../contexts/googleContext"
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
  const plottableResults = results.reduce((acc, result) => {
    result.service_at_locations.forEach(service_at_location => {
      if (
        service_at_location.location.geometry.coordinates[0] &&
        service_at_location.location.geometry.coordinates[1] &&
        !acc.find(item => item.id === result.id) // Check if the result id is already in the accumulator
      ) {
        acc.push({
          id: result.id,
          name: result.name,
          location: service_at_location.location,
        })
      }
    })
    return acc
  }, [])

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
