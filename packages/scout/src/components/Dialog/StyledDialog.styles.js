import styled from "styled-components"
import { DialogContent } from "@reach/dialog"
import "@reach/dialog/styles.css"

const StyledDialogOverlay = styled("div")`
  background: hsla(0, 0%, 0%, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 100;
`

const StyledDialog = styled(DialogContent)`
  background: white;
  outline: none;
  position: relative;
  padding: 0px;
  margin: 20px auto;
  width: 92vw;
  max-width: 700px;
  min-height: max(60vh, 400px);
  &:hover {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin: 60px auto;
  }
  animation: splat 0.15s ease-out;
  @keyframes splat {
    from {
      opacity: 0;
      transform: scale(0.99);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

export { StyledDialogOverlay, StyledDialog }
