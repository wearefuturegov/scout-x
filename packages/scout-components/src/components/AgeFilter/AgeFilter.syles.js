import styled from "styled-components"
import { FilterStyles } from "./../"

const { Content } = FilterStyles

const ColumnContent = styled(Content)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
`

const Field = styled.div`
  margin-bottom: 25px;
  @supports (display: grid) {
    margin-bottom: 0px;
  }
`

const LabelWithMargin = styled.label`
  color: ${props => props.theme.styles.text};
  cursor: pointer;
  display: block;
  margin-bottom: 7px;
`

const Input = styled.input`
  font-size: 0.9rem;
  padding: 7px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: 100%;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    opacity: 0.3;
  }
`

export { ColumnContent, Field, LabelWithMargin, Input }
