import React from "react"
import * as Styles from "./SocialMedia.styles"
import Icon from "../Icon"

const SocialMedia = ({ links }) => {
  return (
    <Styles.Container>
      {links.map(link => (
        <Icon key={link.type} fillColor={"#fff"} {...link} />
      ))}
    </Styles.Container>
  )
}

export default SocialMedia
