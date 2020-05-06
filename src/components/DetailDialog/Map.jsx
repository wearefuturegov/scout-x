import React from "react"
import queryString from "query-string"
import styled from "styled-components"
// import marker from "./marker.png"

const Img = styled.img`
    width: 100%;
`

const Map = ({
    latitude,
    longitude
}) => {
    const query = queryString.stringify({
        scale: 2,
        key: process.env.REACT_APP_GOOGLE_CLIENT_KEY,
        size: "1200x270",
        markers: `${latitude},${longitude}`
    })

    return <Img 
        src={`https://maps.googleapis.com/maps/api/staticmap?${query}`} 
        alt=""
        />
}

export default Map