import React, { useEffect, useState } from "react"
import { GoogleMap, useGoogleMap } from "@react-google-maps/api"

import { MapMarker, Loader } from "~/src/components"
import { useGoogleState } from "~/src/contexts"

import { Outer, LoadingOuter } from "./ListMap.styles"

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

const ListMap = React.memo(
  ({ serviceStatus, serviceData, goToServiceDetails }) => {
    let { mapReady } = useGoogleState()

    if (serviceStatus === "error") {
      return null
    } else if (serviceStatus === "loading") {
      return (
        <LoadingOuter>
          <Loader position="relative" />
        </LoadingOuter>
      )
    } else {
      let plottableResults = []
      serviceData &&
        serviceData.map(result =>
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

      //@TODO include cookie check in here so theres no accidents
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
                  goToServiceDetails={goToServiceDetails}
                />
              ))}
          </GoogleMap>
        </Outer>
      ) : null
    }
  }
)

export default ListMap
