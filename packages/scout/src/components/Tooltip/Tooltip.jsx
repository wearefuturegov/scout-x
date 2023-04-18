import styled from "styled-components"
import Tooltip from "@reach/tooltip"
import "@reach/tooltip/styles.css"

const StyledTooltip = styled(Tooltip)`
  border-color: ${props => props.theme.styles.cardShadow};
  background: ${props => props.theme.styles.pale};
  color: ${props => props.theme.styles.grey};
`

export default StyledTooltip
