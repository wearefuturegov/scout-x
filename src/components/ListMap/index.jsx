import React, { useEffect, useRef } from "react"
import { GoogleMap } from "@react-google-maps/api"
import Marker from "./Marker"
import { GoogleContextConsumer } from "../../contexts/googleContext"
import styled from "styled-components"
import theme from "../_theme"

const Outer = styled.section`
    height: 450px;
    border: 1px solid ${theme.cardShadow};
    margin-bottom: 25px;

    .list-map{
        height: 100%;
    }
`

const ListMap = ({
    results,
    isLoaded
}) => {

    const mapInstance = useRef(false)

    useEffect(()=>{
        if(isLoaded && results.length > 0){
            // const bounds = new window.google.maps.LatLngBounds()
            // results.map(service => {
            //     return bounds.extend(new window.google.maps.LatLng(
            //         service.geo.coordinates[1],
            //         service.geo.coordinates[0]
            //     ))
            // })
            // mapInstance.current.state.map.fitBounds(bounds)
        }
    // eslint-disable-next-line
    }, [results])

    return isLoaded ? 
    <Outer>
        <GoogleMap 
            mapContainerClassName="list-map"
            ref={mapInstance}
            center={{lat: 51.8152889, lng: -0.810456}}
            options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false
            }}
            zoom={13}
        > 
            {results.map(service=>
                <Marker
                    key={service.assetId} 
                    service={service} 
                />    
            )}
        </GoogleMap>
    </Outer>
: 
    <p>Map loading...</p>
}

const WrappedMap = props =>
    <GoogleContextConsumer>
        {context =>
            <ListMap isLoaded={context.isLoaded} {...props}/>
        }
    </GoogleContextConsumer>

export default WrappedMap