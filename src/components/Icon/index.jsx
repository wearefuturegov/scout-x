import React from "react"
import * as Styles from "./Icon.styles"
import Facebook from "./Facebook"
import Instagram from "./Instagram"
import YouTube from "./YouTube"
import Twitter from "./Twitter"
import LinkedIn from "./LinkedIn"

const iconTypes = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: YouTube,
  twitter: Twitter,
  linkedin: LinkedIn,
}

const Icon = ({ type, url, label, fillColor }) => {
  const Component = iconTypes[type]
  return Component ? (
    <Styles.Link
      href={url}
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label={label}
    >
      <Component fillColor={fillColor} />
    </Styles.Link>
  ) : null
}

export default Icon
