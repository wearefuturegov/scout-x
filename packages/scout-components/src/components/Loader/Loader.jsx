import styled from "styled-components"

const Loader = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background: ${props => props.theme.styles.focus};
  height: 3px;
  width: 0%;
  animation: load 60s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.05, 0.06, 0.05, 0.95);
  transition: 0.2s;
  z-index: 2;
  @keyframes load {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`

export default Loader
