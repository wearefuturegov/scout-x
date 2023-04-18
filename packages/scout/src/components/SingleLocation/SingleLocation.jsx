import React from "react"

import { DetailMapStatic, DetailMap, A } from "./../../components"

import { Outer, MapContainer, Inner, Crosshead } from "./SingleLocation.styles"

const SingleLocation = ({
  name,
  geometry,
  address_1,
  city,
  postal_code,
  mask_exact_address,
}) => {
  // TODO cookies
  const cookiesAccepted = true
  const latitude = parseFloat(geometry.coordinates[1])
  const longitude = parseFloat(geometry.coordinates[0])
  const offCenter = true
  return (
    <Outer>
      {cookiesAccepted ? (
        <MapContainer aria-hidden="true">
          <DetailMap
            latitude={latitude}
            longitude={longitude}
            offCenter={offCenter}
          />
        </MapContainer>
      ) : (
        <>
          <StaticMapContainer>
            <DetailMapStatic
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
