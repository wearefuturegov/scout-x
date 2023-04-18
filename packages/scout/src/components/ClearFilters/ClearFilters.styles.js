import styled from "styled-components"

const Outer = styled.section`
  margin-bottom: 25px;

  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-bottom: 0px;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 20px 0px;
  text-align: left;
  color: ${props => props.theme.styles.link};
  font-size: 1rem;
  margin-top: 20px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-top: 0px;
  }
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &:active,
  &:hover {
    color: ${props => props.theme.styles.linkHover};
  }
`

export { Outer, Button }
