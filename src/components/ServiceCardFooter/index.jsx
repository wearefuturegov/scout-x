import React from "react"

import styled from "styled-components"
import { buildServiceCardFooter, prettyDistance } from "../../lib/utils"
import tick from "./tick.svg"
import { theme } from "./../../themes/theme_generator"

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: ${props => props.theme.styles.grey};
  line-height: 1.7;
`

const LocalOfferTag = styled.strong`
  margin-right: 15px;
  margin-bottom: 2px;
  background: ${props => props.theme.styles.focus};
  color: ${props => props.theme.styles.darkYellow};
  border-radius: 2px;
  padding: 0px 6px;
  &:before {
    content: "";
    display: inline-block;
    margin-right: 8px;
    width: 13px;
    height: 10px;
    background-image: url(${tick});
    background-size: cover;
    background-position: center;
  }
`

const CountyWideServiceTag = styled.strong`
  margin-right: 15px;
  margin-bottom: 2px;
  background: ${props => props.theme.styles.link};
  color: ${props => props.theme.styles.white};
  border-radius: 2px;
  padding: 0px 6px;
`

const Point = styled.span`
  color: ${props => props.theme.styles.grey};
  &:after {
    margin-left: 7px;
    content: "•";
    margin-right: 7px;
  }
  &:last-of-type:after {
    content: none;
  }
`

const Distance = styled(Point)`
  font-weight: bold;
`

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
