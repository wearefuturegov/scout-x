import React, { useState } from "react"
import styled from "styled-components"

import Map from "./Map"
import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"
import { A } from "../A"
import { TickList, TickListItem } from "../TickList"
import { checkCookiesAccepted } from "./../../lib/cookies"
import MapStatic from "./MapStatic"

const Outer = styled.div`
  margin-top: 30px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-top: 40px;
  }
`

const Crosshead = styled.h2`
  margin-bottom: 5px;
  color: ${props => props.theme.styles.text};
`

const Button = styled.button`
  position: relative;
  display: block;
  width: 100%;
  border: none;
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.styles.cardShadow};
  font-size: 1rem;
  background: none;
  padding: 15px 0px;
  padding-right: 30px;
  color: ${props => props.theme.styles.text};
  cursor: pointer;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &:after {
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url(${downArrow});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    right: 0px;
    top: 20px;
  }
  &[aria-expanded="true"] {
    &:after {
      background-image: url(${upArrow});
    }
  }
`

const Panel = styled.div`
  padding: 20px 0px;
  div:first-child {
    margin-bottom: 25px;
  }
  &[hidden] {
    display: none;
  }
  @supports (display: grid) {
    @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 35px;
      div:first-child {
        margin-bottom: 0px;
      }
    }
  }
`

const MapContainer = styled.section`
  height: 200px;
  width: 100%;
  background: ${props => props.theme.styles.pale};
  .map {
    height: 100%;
  }
`

const StaticMapContainer = styled.section`
  height: 200px;
  width: 100%;
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

const TickListWithTopMargin = styled(TickList)`
  margin-top: 25px;
`

const LocationAccordion = ({ service_at_locations }) => {
  const [active, setActive] = useState(0)
  const cookiesAccepted = checkCookiesAccepted()

  return (
    <Outer>
      <Crosshead>Locations</Crosshead>
      {service_at_locations.map((service_at_location, i) => (
        <div key={service_at_location.location.id}>
          <Button
            onClick={e => (active === i ? setActive(false) : setActive(i))}
            aria-expanded={active === i}
          >
            <h3>
              {service_at_location.location.name ||
                service_at_location.location.address_1 ||
                `Location ${i + 1}`}
            </h3>
          </Button>
          <Panel hidden={active !== i}>
            <div>
              {service_at_location.location.mask_exact_address ? (
                <>
                  <p>Near {service_at_location.location.city}</p>
                  <p>{service_at_location.location.postal_code}</p>
                  <p>
                    <em>This location is approximate</em>
                  </p>
                </>
              ) : (
                <>
                  <p>{service_at_location.location.address_1}</p>
                  <p>{service_at_location.location.city}</p>
                  <p>{service_at_location.location.postal_code}</p>
                  <p>
                    <A
                      href={`https://maps.google.com/maps/search/${service_at_location.location.postal_code}`}
                    >
                      Get directions
                    </A>
                  </p>
                </>
              )}
              <TickListWithTopMargin>
                {service_at_location.location.accessibilities.map(point => (
                  <TickListItem key={point.name}>{point.name}</TickListItem>
                ))}
              </TickListWithTopMargin>
            </div>
            {cookiesAccepted ? (
              <MapContainer>
                <Map
                  latitude={parseFloat(
                    service_at_location.location.geometry.coordinates[1]
                  )}
                  longitude={parseFloat(
                    service_at_location.location.geometry.coordinates[0]
                  )}
                />
              </MapContainer>
            ) : (
              <>
                <StaticMapContainer>
                  <MapStatic
                    latitude={
                      service_at_location.location.geometry.coordinates[1]
                    }
                    longitude={
                      service_at_location.location.geometry.coordinates[0]
                    }
                    offCenter={false}
                    zoom={15}
                    size={`300x250`}
                  />
                </StaticMapContainer>
              </>
            )}
          </Panel>
        </div>
      ))}
    </Outer>
  )
}

export default LocationAccordion
