import styled from "styled-components"

const Outer = styled.section`
  height: 450px;
  border: 1px solid ${props => props.theme.styles.cardShadow};
  margin-bottom: 25px;
  .list-map {
    height: 100%;
  }
`

export { Outer }
