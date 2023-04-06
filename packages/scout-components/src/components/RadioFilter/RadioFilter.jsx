import React from "react"

import { Content, StyledField, StyledLabel, Input } from "./RadioFilter.styles"

import { FilterStyles } from "./../"

const { Outer } = FilterStyles

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
