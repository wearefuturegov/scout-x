import React from "react"

import { StyledLink, Count } from "./PinboardLink.styles"
import { useSettingsState, usePinboardState } from "./../../"

const PinboardLink = ({ locationSearch }) => {
  const { settings } = useSettingsState()
  const { pinboard } = usePinboardState()

  const url = `${settings.basePath || ""}/pinboard${locationSearch}`

  console.log(settings)
  return pinboard.length > 0 ? (
    <StyledLink to={url}>
      See pinned services
      <Count>({pinboard.length})</Count>
    </StyledLink>
  ) : null
}

export default PinboardLink
