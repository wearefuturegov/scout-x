import React from "react"
import styled from "styled-components"

const Map = ({
    latitude,
    longitude
}) =>
    <img 
        src={`https://maps.googleapis.com/maps/api/staticmap?key=${process.env.GOOGLE_CLIENT_KEY}&size=800x250&markers=${latitude},${longitude}`} 
        alt=""
        />

export default Map