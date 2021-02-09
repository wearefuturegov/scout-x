const truncate = (str, noWords) => {
  if (str && noWords > 1) {
    if (str.split(" ").length > noWords) {
      return str.split(" ").splice(0, noWords).join(" ") + "..."
    } else {
      return str
    }
  }
}

module.exports = (host, pins) =>
  pins
    .map(
      pin => `
            # ${pin.name}
            ${host}/service/${pin.id}
            ${truncate(pin.description, 30)}
        `
    )
    .join("")
