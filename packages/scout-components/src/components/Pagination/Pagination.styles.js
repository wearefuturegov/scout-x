import styled from "styled-components"

const ResultsFooter = styled.footer`
  margin-top: 25px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SecondaryButton = styled.button`
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

export { SecondaryButton, ResultsFooter }
