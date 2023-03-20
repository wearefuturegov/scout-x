import React from "react"
import styled from "styled-components"

import { Outer, Label, Field } from "./layout"

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

export const Content = styled.div`
  padding: 25px 0px;
  border-top: 1px solid ${props => props.theme.styles.cardShadow};
  border-bottom: 1px solid ${props => props.theme.styles.cardShadow};
`

export const StyledField = styled(Field)`
  &:focus-within label:before {
    outline: none;
    box-shadow: 0px 0px 0px 3px ${props => props.theme.styles.focus};
  }
`

export const StyledLabel = styled(Label)`
  &:before {
    border-radius: 100%;
  }
`

const RadioFilter = ({
  name,
  options,
  selection,
  setSelection,
  setPage,
  clearThis,
  foldable,
}) => {
  const handleChange = e => {
    setSelection(e.target.value)
    setPage(1)
    clearThis([])
  }

  if (options.length > 0) {
    return (
      <Outer>
        <Content>
          {options.map((o, i) => (
            <StyledField key={`${o.slug}_${i}`}>
              <Input
                type="radio"
                id={o.slug}
                name={name}
                value={o.slug}
                onChange={handleChange}
                checked={selection === o.slug}
              />
              <StyledLabel htmlFor={o.slug}>{o.label}</StyledLabel>
            </StyledField>
          ))}
        </Content>
      </Outer>
    )
  } else {
    return null
  }
}

export default RadioFilter
