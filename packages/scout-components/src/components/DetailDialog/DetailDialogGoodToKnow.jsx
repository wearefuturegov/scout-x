import React from "react"

import { A, TickListItem, daysSince } from "./../../"

import { TwoColumnTickList } from "./DetailDialogGoodToKnow.styles"

export const buildGoodToKnow = ({
  needs_referral,
  referral_url,
  local_offer,
  free,
  locations,
  regular_schedules,
  updated_at,
  min_age,
  max_age,
}) => {
  let goodToKnow = []

  local_offer && goodToKnow.push("Includes information for people with SEND")
  needs_referral && goodToKnow.push("Needs a referral")
  wheelchairAccessible(locations) && goodToKnow.push("Wheelchair accessible")
  free && goodToKnow.push("Free")
  daysSince(updated_at) < 30 && goodToKnow.push("Recently updated")
  openWeekends(regular_schedules) && goodToKnow.push("Open weekends")
  openAfterSix(regular_schedules) && goodToKnow.push("Open after 6pm")

  if (min_age && max_age) {
    goodToKnow.push(`Suitable for ${min_age} to ${max_age} year olds`)
  } else if (min_age) {
    goodToKnow.push(`Suitable for ${min_age} year olds up`)
  } else if (max_age) {
    goodToKnow.push(`Suitable up to ${max_age} year olds`)
  } else {
    goodToKnow.push(`Suitable for all ages`)
  }

  return goodToKnow
}

const DetailDialogGoodToKnow = ({ service }) => {
  let goodToKnow = buildGoodToKnow(service)
  if (goodToKnow.length > 0) {
    return (
      <Body>
        <Crosshead>Good to know</Crosshead>
        <TwoColumnTickList>
          {goodToKnow.map(point => (
            <TickListItem key={point}>
              {point}
              <br />
              {point === "Needs a referral" && service.referral_url && (
                <A href={service.referral_url}>Details</A>
              )}
            </TickListItem>
          ))}
        </TwoColumnTickList>
      </Body>
    )
  }
}

export default DetailDialogGoodToKnow
