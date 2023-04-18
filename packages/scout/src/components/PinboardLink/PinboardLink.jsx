import React from "react"

import { StyledLink, Count } from "./PinboardLink.styles"
import { useSettingsState, usePinboardState } from "./../../contexts"

const PinboardLink = ({ locationSearch }) => {
  const { settings } = useSettingsState()
  const { pinboard } = usePinboardState()

  const url = `${settings.basePath || ""}/pinboard${locationSearch}`
  return pinboard.length > 0 ? (
    <StyledLink to={url}>
      See pinned services
      <Count>({pinboard.length})</Count>
    </StyledLink>
  ) : null
}

export default PinboardLink
