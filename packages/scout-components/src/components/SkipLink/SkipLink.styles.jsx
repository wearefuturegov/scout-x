import styled from "styled-components"

const SkipLink = styled.a`
  position: absolute;
  font-size: 1rem;
  background: ${props => props.theme.styles.pale};
  top: 10px;
  left: 20px;
  padding: 10px;
  color: ${props => props.theme.styles.link};
  text-decoration: none;
  font-weight: bold;
  transform: translateY(-500px);
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    top: 13px;
    left: 13px;
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
    transform: translateY(0);
  }
`

export { SkipLink }
