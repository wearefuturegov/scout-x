const twelveHourTime = rawTime => {
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

export default twelveHourTime
