import React from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import { GoogleContextConsumer } from "../../contexts/googleContext"
import marker from "../ListMap/marker.svg"

const Map = React.memo(({ latitude, longitude, isLoaded, offCenter }) => {
  return isLoaded ? (
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

export default props => (
  <GoogleContextConsumer>
    {context => <Map isLoaded={context.isLoaded} {...props} />}
  </GoogleContextConsumer>
)
