import React, { useEffect } from "react"
import { GoogleMap, useGoogleMap } from "@react-google-maps/api"
import MapMarker from "./MapMarker"
import { useGoogleState } from "./../../"

import { Outer } from "./ListMap.styles"

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

const ListMap = React.memo(({ results, locationSearch, locationNavigate }) => {
  let { mapReady } = useGoogleState()
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

  //TODO include cookie check in here so theres no accidents
  // const cookiesAccepted = true
  // if (!cookiesAccepted) {
  //   return null
  // }

  console.log(plottableResults)
  return mapReady ? (
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
            <MapMarker
              key={service.id}
              service={service}
              locationNavigate={locationNavigate}
              locationSearch={locationSearch}
            />
          ))}
      </GoogleMap>
    </Outer>
  ) : (
    <p>Map loading...</p>
  )
})

export default ListMap
