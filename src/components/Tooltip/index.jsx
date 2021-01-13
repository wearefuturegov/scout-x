import theme from "../_theme"
import styled from "styled-components"
import Tooltip from "@reach/tooltip"
import "@reach/tooltip/styles.css"

const StyledTooltip = styled(Tooltip)`
  border-color: ${theme.cardShadow};
  background: ${theme.pale};
  color: ${theme.grey};
`

export default StyledTooltip
