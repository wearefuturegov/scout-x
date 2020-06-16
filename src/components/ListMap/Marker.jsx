import React from "react"
import { Marker } from "@react-google-maps/api"
import marker from "./marker.svg"

const ResultMarker = ({
    service,
    location,
    navigate
}) => 
    <>
        <Marker
            onClick={() => {
                navigate(`/service/${service.id}${location.search}`)
            }}
            animation={window.google.maps.Animation.DROP}
            position={{
                lat: parseFloat(service.locations[0].latitude),
                lng: parseFloat(service.locations[0].longitude)
            }}
            title={service.name}
            icon={{
                url: marker,
                optimized: false,
                scaledSize: new window.google.maps.Size(40, 40),
            }}
        />
    </>

export default ResultMarker