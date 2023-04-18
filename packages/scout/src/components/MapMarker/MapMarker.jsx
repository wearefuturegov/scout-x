import React from "react"
import { Marker } from "@react-google-maps/api"
import marker from "./marker.svg"

const MapMarker = ({ service, goToServiceDetails }) => (
  <Marker
    key={service.id}
    onClick={() => {
      goToServiceDetails(service.id)
    }}
    animation={window.google.maps.Animation.DROP}
    position={{
      lat: service.location.geometry.coordinates[1],
      lng: service.location.geometry.coordinates[0],
    }}
    title={service.name}
    icon={{
      url: marker,
      optimized: false,
      scaledSize: new window.google.maps.Size(40, 40),
    }}
  />
)

export default MapMarker
