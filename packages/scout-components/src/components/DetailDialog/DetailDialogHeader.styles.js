import styled from "styled-components"

const Caption = styled.p`
  color: ${props => props.theme.styles.grey};
  margin-bottom: 10px;
  font-size: 1.1rem;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    font-size: 1.2rem;
  }
`
export { Caption }
