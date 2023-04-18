import styled from "styled-components"

const Outer = styled.section`
  height: 450px;
  border: 1px solid ${props => props.theme.styles.cardShadow};
  margin-bottom: 25px;
  .list-map {
    height: 100%;
  }
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }
  position: relative;
`

const LoadingOuter = styled(Outer)`
  display: block;
  position: relative;
  background: ${props => props.theme.styles.white};
`

export { Outer, LoadingOuter }
