import React from "react"
import styled from "styled-components"

import Map from "./Map"
import { A } from "@outpost-platform/scout-components"

import { checkCookiesAccepted } from "./../../lib/cookies"
import MapStatic from "./MapStatic"

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

const StaticMapContainer = styled.section`
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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }
`

const SingleLocation = ({
  name,
  geometry,
  address_1,
  city,
  postal_code,
  mask_exact_address,
}) => {
  const cookiesAccepted = checkCookiesAccepted()
  const latitude = parseFloat(geometry.coordinates[1])
  const longitude = parseFloat(geometry.coordinates[0])
  const offCenter = true
  return (
    <Outer>
      {cookiesAccepted ? (
        <MapContainer aria-hidden="true">
          <Map
            latitude={latitude}
            longitude={longitude}
            offCenter={offCenter}
          />
        </MapContainer>
      ) : (
        <>
          <StaticMapContainer>
            <MapStatic
              latitude={latitude}
              longitude={longitude}
              offCenter={offCenter}
              zoom={15}
              size={`900x300`}
            />
          </StaticMapContainer>
        </>
      )}
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
}

export default SingleLocation
