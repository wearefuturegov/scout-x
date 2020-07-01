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


const daysSince = date => {
    return (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24.0)    
}

export const buildServiceCardFooter = ({
    pick_up_drop_off,
    needs_referral,
    current_vacancies,
    free,
    locations,
    updated_at
}) => {

    let keyPoints = []

    let wheelchairAccessible = locations && locations.length > 0 && locations.reduce((wheelchairAccessible, location) => {
        return location.accessibilities.includes({name: "Partial wheelchair access"}) ? true : false
    })

    if(wheelchairAccessible) keyPoints.push("Wheelchair accessible")
    if(pick_up_drop_off) keyPoints.push("Pick-up/drop-off service")
    if(current_vacancies) keyPoints.push("Vacancies for new children")
    if(free) keyPoints.push("Free")
    if(needs_referral) keyPoints.push("Needs referral")
    if(daysSince(updated_at) < 30) keyPoints.push("Recently updated")

    return keyPoints.slice(0, 5)
}