import React, { useState } from "react"
import styled from "styled-components"

import Map from "./Map"
import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"
import A from "../A"
import { TickList, TickListItem } from "../TickList"

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

const TickListWithTopMargin = styled(TickList)`
  margin-top: 25px;
`

const LocationAccordion = ({ locations }) => {
  const [active, setActive] = useState(0)

  return (
    <Outer>
      <Crosshead>Locations</Crosshead>
      {locations.map((location, i) => (
        <div key={location.id}>
          <Button
            onClick={e => (active === i ? setActive(false) : setActive(i))}
            aria-expanded={active === i}
          >
            <h3>
              {location.name || location.address_1 || `Location ${i + 1}`}
            </h3>
          </Button>
          <Panel hidden={active !== i}>
            <div>
              {location.mask_exact_address ? (
                <>
                  <p>Near {location.city}</p>
                  <p>{location.postal_code}</p>
                  <p>
                    <em>This location is approximate</em>
                  </p>
                </>
              ) : (
                <>
                  <p>{location.address_1}</p>
                  <p>{location.city}</p>
                  <p>{location.postal_code}</p>
                  <p>
                    <A
                      href={`https://maps.google.com/maps/search/${location.postal_code}`}
                    >
                      Get directions
                    </A>
                  </p>
                </>
              )}
              <TickListWithTopMargin>
                {location.accessibilities.map(point => (
                  <TickListItem key={point.name}>{point.name}</TickListItem>
                ))}
              </TickListWithTopMargin>
            </div>
            <MapContainer>
              <Map
                latitude={parseFloat(location.geometry.coordinates[1])}
                longitude={parseFloat(location.geometry.coordinates[0])}
              />
            </MapContainer>
          </Panel>
        </div>
      ))}
    </Outer>
  )
}

export default LocationAccordion
