import React from "react"
import styled from "styled-components"

import { Outer, RadioLabel, RadioField, InputRadio } from "./layout"

export const Content = styled.div`
  padding: 25px 0px;
  border-top: 1px solid ${props => props.theme.styles.cardShadow};
  border-bottom: 1px solid ${props => props.theme.styles.cardShadow};
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
            <RadioField key={`${o.slug}_${i}`}>
              <InputRadio
                type="radio"
                id={o.slug}
                name={name}
                value={o.slug}
                onChange={handleChange}
                checked={selection === o.slug}
              />
              <RadioLabel htmlFor={o.slug}>{o.label}</RadioLabel>
            </RadioField>
          ))}
        </Content>
      </Outer>
    )
  } else {
    return null
  }
}

export default RadioFilter
