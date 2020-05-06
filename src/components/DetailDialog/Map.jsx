import React from "react"
import styled from "styled-components"
import marker from "./marker.png"

const Img = styled.img`
    width: 100%;
`

const Map = ({
    latitude,
    longitude
}) =>
    <Img 
        src={`https://maps.googleapis.com/maps/api/staticmap?scale=2&key=${process.env.REACT_APP_GOOGLE_CLIENT_KEY}&size=1200x270&markers=${latitude},${longitude}`} 
        alt=""
        />

export default Map