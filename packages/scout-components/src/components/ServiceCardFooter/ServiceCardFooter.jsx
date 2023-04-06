import React from "react"

import { prettyDistance, daysSince } from "./../../"

import { theme } from "./../../themes/theme_generator"
import {
  Footer,
  LocalOfferTag,
  CountyWideServiceTag,
  Point,
  Distance,
} from "./ServiceCardFooter.styles"

export const wheelchairAccessible = locations =>
  locations
    ?.reduce((accumulator, loc) => accumulator.concat(loc.accessibilities), [])
    ?.filter(access => access?.name === "Partial wheelchair access").length > 0

const buildServiceCardFooter = ({
  needs_referral,
  free,
  locations,
  updated_at,
  status,
}) => {
  let keyPoints = []
  if (status === "temporarily closed") keyPoints.push("Temporarily closed")
  if (locations && wheelchairAccessible(locations))
    keyPoints.push("Wheelchair accessible")
  if (free) keyPoints.push("Free")
  if (needs_referral) keyPoints.push("Needs referral")
  if (daysSince(updated_at) < 30) keyPoints.push("Recently updated")
  return keyPoints
}

const ServiceCardFooter = props => {
  let { local_offer, current_vacancies, distance_away, locations } = props

  const countywide = locations.length > 0 ? false : true

  let points

  if (current_vacancies && !local_offer) {
    points = buildServiceCardFooter({ ...props, current_vacancies: false })
  } else {
    points = buildServiceCardFooter(props)
  }

  return (
    <Footer>
      {local_offer && <LocalOfferTag>Part of local offer</LocalOfferTag>}
      {theme.noLocationIsCountywide && countywide && (
        <CountyWideServiceTag>
          {theme.serviceCard.countyWideServiceText}
        </CountyWideServiceTag>
      )}
      {distance_away && <Distance>{prettyDistance(distance_away)}</Distance>}
      {points.slice(0, distance_away ? 2 : 3).map(point => (
        <Point key={point}>{point}</Point>
      ))}
    </Footer>
  )
}

export default ServiceCardFooter
