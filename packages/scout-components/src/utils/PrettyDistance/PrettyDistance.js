const prettyDistance = miles => {
  if (miles !== undefined) {
    let roundMiles = Math.round(miles)
    if (roundMiles < 1 || roundMiles === 0) return "Less than a mile away"
    if (roundMiles === 1) return "About a mile away"
    return `About ${roundMiles} miles away`
  }
}

export default prettyDistance
