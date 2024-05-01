export const truncate = (str, noWords) => {
  if (str && noWords > 1) {
    if (str.split(" ").length > noWords) {
      return str.split(" ").splice(0, noWords).join(" ") + "..."
    } else {
      return str
    }
  }
}

export const prettyDistance = miles => {
  if (miles !== undefined) {
    let roundMiles = Math.round(miles)
    if (roundMiles < 1 || roundMiles === 0) return "Less than a mile away"
    if (roundMiles === 1) return "About a mile away"
    return `About ${roundMiles} miles away`
  }
}

export const daysSince = date => {
  return (
    (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24.0)
  )
}

export const wheelchairAccessible = locations =>
  locations
    ?.reduce((accumulator, loc) => accumulator.concat(loc.accessibilities), [])
    ?.filter(access => access?.name === "Partial wheelchair access").length > 0

export const openWeekends = schedules =>
  schedules.filter(
    sched => sched.weekday === "Saturday" || sched.weekday === "Sunday"
  ).length > 0

export const openAfterSix = schedules =>
  schedules.filter(sched => sched.closes_at > "18:00").length > 0

export const buildServiceCardFooter = ({
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

export const twelveHourTime = rawTime => {
  const oldFormatTimeArray = rawTime.split(":")
  const HH = parseInt(oldFormatTimeArray[0])
  const MM = oldFormatTimeArray[1] === "00" ? "" : `.${oldFormatTimeArray[1]}`
  const AMPM = HH >= 12 ? "pm" : "am"
  let hours
  if (HH === 0) {
    hours = HH + 12
  } else if (HH > 12) {
    hours = HH - 12
  } else {
    hours = HH
  }
  return `${hours}${MM}${AMPM}`
}
