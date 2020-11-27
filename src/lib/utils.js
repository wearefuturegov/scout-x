import taxonomyData from "../data/_taxonomies.json"

export const truncate = (str, noWords) => {
    if(str && (noWords > 1)){
        if(str.split(" ").length > noWords){
            return str.split(" ").splice(0,noWords).join(" ") + "..."
        } else {
            return str
        }
    }
}

export const prettyDistance = miles => {
    if(miles !== undefined){
        let roundMiles = Math.round(miles)
        if(roundMiles < 1 || roundMiles === 0) return "Less than a mile away"
        if(roundMiles === 1) return "About a mile away"
        return `About ${roundMiles} miles away`
    }
}

export const daysSince = date => {
    return (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24.0)    
}

export const wheelchairAccessible = locations => locations
    .reduce((accumulator, loc) => accumulator.concat(loc.accessibilities), [])
    .filter(access => access.name === "Partial wheelchair access")
    .length > 0

export const openWeekends = schedules => schedules
    .filter(sched => sched.weekday === "Saturday" || "Sunday")
    .length > 0

export const openAfterSix = schedules => schedules
    .filter(sched => sched.closes_at >= "18:00")
    .length > 0

export const buildServiceCardFooter = ({
    pick_up_drop_off_service,
    needs_referral,
    current_vacancies,
    free,
    locations,
    updated_at
}) => {
    let keyPoints = []
    if(locations && wheelchairAccessible(locations)) keyPoints.push("Wheelchair accessible")
    if(pick_up_drop_off_service) keyPoints.push("Pick-up/drop-off service")
    if(current_vacancies) keyPoints.push("Spaces for new children")
    if(free) keyPoints.push("Free")
    if(needs_referral) keyPoints.push("Needs referral")
    if(daysSince(updated_at) < 30) keyPoints.push("Recently updated")
    return keyPoints
}

export const buildGoodToKnow = ({
    pick_up_drop_off_service,
    needs_referral,
    referral_url,
    local_offer,
    current_vacancies,
    free,
    locations,
    regular_schedules,
    updated_at,
    min_age,
    max_age
}) => {
    let goodToKnow = []

    local_offer && goodToKnow.push("Part of the Buckinghamshire local offer for SEND")
    pick_up_drop_off_service && goodToKnow.push("Offers pick-up/drop-off service from nearby schools")
    needs_referral && goodToKnow.push("Needs a referral")
    wheelchairAccessible(locations) && goodToKnow.push("Wheelchair accessible")
    current_vacancies && goodToKnow.push("Spaces for new children")
    free && goodToKnow.push("Free")
    daysSince(updated_at) < 30 && goodToKnow.push("Recently updated")
    openWeekends(regular_schedules) && goodToKnow.push("Open weekends")
    openAfterSix(regular_schedules) && goodToKnow.push("Open after 6pm")

    if(min_age && max_age){
        goodToKnow.push(`Suitable for ${min_age}-${max_age} year olds`)
    } else if (min_age){
        goodToKnow.push(`Suitable for ${min_age} year olds up`)
    } else if (max_age){
        goodToKnow.push(`Suitable up to ${max_age} year olds`)
    } else {
        goodToKnow.push(`Suitable for all ages`)
    }

    return goodToKnow
}
