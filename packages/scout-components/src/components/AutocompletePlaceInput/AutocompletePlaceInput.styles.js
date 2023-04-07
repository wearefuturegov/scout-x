import styled from "styled-components"

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: 100%;
  height: 45px;
  padding-right: 45px;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    opacity: 0.3;
  }
`

export { Input }
