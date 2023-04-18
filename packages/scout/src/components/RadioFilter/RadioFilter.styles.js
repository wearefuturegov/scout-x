import styled from "styled-components"

import { FilterStyles } from "./../../components"

const { Label, Field } = FilterStyles

const Input = styled.input`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 29px;
  border-radius: 100%;
  height: 29px;
  opacity: 0;
  &:checked + label:after {
    position: absolute;
    content: "";
    display: block;
    border-radius: 100%;
    background: ${props => props.theme.styles.text};
    height: 19px;
    width: 19px;
    left: 5px;
    top: 5px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`

const Content = styled.div`
  padding: 25px 0px;
  border-top: 1px solid ${props => props.theme.styles.cardShadow};
  border-bottom: 1px solid ${props => props.theme.styles.cardShadow};
`

const StyledField = styled(Field)`
  &:focus-within label:before {
    outline: none;
    box-shadow: 0px 0px 0px 3px ${props => props.theme.styles.focus};
  }
`

const StyledLabel = styled(Label)`
  &:before {
    border-radius: 100%;
  }
`

export { Content, StyledField, StyledLabel, Input }
