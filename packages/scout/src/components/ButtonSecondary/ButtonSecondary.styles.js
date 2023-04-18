import styled from "styled-components"

const ButtonSecondary = styled.button`
  font-size: 1rem;
  color: ${props => props.theme.styles.link};
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 25px;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
    background: ${props => props.theme.styles.focus};
  }
  &:active {
    color: ${props => props.theme.styles.linkActive};
  }
`
export { ButtonSecondary }
