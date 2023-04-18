import React from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import marker from "./../MapMarker/marker.svg"
import { useGoogleState } from "./../../contexts"

const DetailMap = React.memo(({ latitude, longitude, isLoaded, offCenter }) => {
  let { mapReady } = useGoogleState()
  return mapReady ? (
    <GoogleMap
      mapContainerClassName="map"
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        draggable: false,
        scrollwheel: false,
        clickableIcons: false,
      }}
      center={{
        lat: latitude,
        lng: offCenter ? longitude - 0.006 : longitude,
      }}
      zoom={15}
    >
      <Marker
        position={{
          lat: latitude,
          lng: longitude,
        }}
        icon={{
          url: marker,
          optimized: false,
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />
    </GoogleMap>
  ) : (
    <p>Map Loading...</p>
  )
})

export default DetailMap
