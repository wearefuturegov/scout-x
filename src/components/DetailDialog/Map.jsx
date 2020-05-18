import React from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import { GoogleContextConsumer } from "../../contexts/googleContext"
import styled from "styled-components"
import theme from "../_theme"
import marker from "../ListMap/marker.svg"

const Outer = styled.section`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    /* pointer-events: none; */
    background: ${theme.pale};
    .map{
        height: 100%;
    }
`

const Map = React.memo(({
    latitude,
    longitude,
    isLoaded
}) => {

    return isLoaded ? 
        <Outer>
            <GoogleMap 
                mapContainerClassName="map"
                options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    zoomControl: false,
                    draggable: false,
                    scrollwheel: false
                }}
                center={{
                    lat: latitude,
                    lng: longitude - 0.006
                }}
                zoom={15}
            > 
                <Marker
                    position={{
                        lat: latitude,
                        lng: longitude
                    }}
                    icon={{
                        url: marker,
                        optimized: false,
                        scaledSize: new window.google.maps.Size(50, 50),
                    }}
                />
            </GoogleMap>
        </Outer>
        : 
        <p>Map loading...</p>
})

export default props =>
    <GoogleContextConsumer>
        {context =>
            <Map isLoaded={context.isLoaded} {...props}/>
        }
    </GoogleContextConsumer>