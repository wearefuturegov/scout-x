import React from "react"
import { Marker } from "@react-google-maps/api"
import marker from "./marker.svg"

const ResultMarker = ({
    service,
    onClick
}) => 
    <Marker
        onClick={onClick}
        animation={window.google.maps.Animation.DROP}
        position={{
            lat: service.geo.coordinates[1],
            lng: service.geo.coordinates[0]
        }}
        title={service.name || service.parentOrganisation}
        icon={{
            url: marker,
            optimized: false,
            scaledSize: new window.google.maps.Size(40, 40),
        }}
    />

export default ResultMarker