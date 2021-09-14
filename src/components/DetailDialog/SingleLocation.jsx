import React from "react"
import styled from "styled-components"

import Map from "./Map"
import A from "../A"

const Outer = styled.div`
  /* display: none; */
  padding: 45px;
  min-height: 250px;
  position: relative;
  margin-bottom: 0px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    /* margin-bottom: 45px; */
    display: block;
  }
`

const Inner = styled.div`
  display: block;
  position: relative;
  background: ${props => props.theme.styles.white};
  padding: 25px;
  width: 100%;
  max-width: 270px;
`

const Crosshead = styled.h2`
  margin-bottom: 5px;
  color: ${props => props.theme.styles.text};
`

const MapContainer = styled.section`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  /* pointer-events: none; */
  background: ${props => props.theme.styles.pale};
  .map {
    height: 100%;
  }
`

const SingleLocation = ({
  name,
  geometry,
  address_1,
  city,
  postal_code,
  mask_exact_address,
}) => (
  <Outer>
    <MapContainer aria-hidden="true">
      <Map
        latitude={parseFloat(geometry.coordinates[1])}
        longitude={parseFloat(geometry.coordinates[0])}
        offCenter
      />
    </MapContainer>
    <Inner>
      <Crosshead>{name || "Where"}</Crosshead>
      {mask_exact_address ? (
        <>
          <p>Near {city}</p>
          <p>{postal_code}</p>
          <p>
            <em>This location is approximate</em>
          </p>
        </>
      ) : (
        <>
          <p>{address_1}</p>
          <p>{city}</p>
          <p>{postal_code}</p>
          <p>
            <A href={`https://maps.google.com/maps/search/${postal_code}`}>
              Get directions
            </A>
          </p>
        </>
      )}
    </Inner>
  </Outer>
)

export default SingleLocation
