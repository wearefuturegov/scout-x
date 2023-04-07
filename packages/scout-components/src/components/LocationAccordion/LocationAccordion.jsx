import React, { useState } from "react"

import { DetailMap, DetailMapStatic, TickListItem, A } from "./../../"

const LocationAccordion = ({ locations }) => {
  const [active, setActive] = useState(0)
  // TODO cookies
  const cookiesAccepted = true

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
            {cookiesAccepted ? (
              <MapContainer>
                <DetailMap
                  latitude={parseFloat(location.geometry.coordinates[1])}
                  longitude={parseFloat(location.geometry.coordinates[0])}
                />
              </MapContainer>
            ) : (
              <>
                <StaticMapContainer>
                  <DetailMapStatic
                    latitude={location.geometry.coordinates[1]}
                    longitude={location.geometry.coordinates[0]}
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
