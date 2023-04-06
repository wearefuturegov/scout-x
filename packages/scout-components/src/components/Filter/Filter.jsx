import React, { useState } from "react"

import {
  Input,
  Outer,
  Legend,
  Label,
  Field,
  Header,
  UnfoldButton,
  Content,
} from "./Filter.styles"

const Filter = ({
  legend,
  options,
  selection,
  setSelection,
  setPage,
  foldable,
}) => {
  const [unfolded, setUnfolded] = useState(selection.length > 0 ? true : false)

  const handleChange = e => {
    let { checked, value } = e.target
    if (checked) {
      setSelection([...selection, value])
    } else {
      setSelection(selection.filter(el => el !== value))
    }
    setPage(1)
  }

  return (
    <Outer>
      <Header>
        {foldable ? (
          <UnfoldButton
            type="button"
            aria-expanded={unfolded ? "true" : "false"}
            onClick={() => setUnfolded(!unfolded)}
          >
            <Legend>{legend}</Legend>
          </UnfoldButton>
        ) : (
          <Legend>{legend}</Legend>
        )}
      </Header>
      {(!foldable || unfolded) && (
        <Content>
          {options.map((o, i) => (
            <Field key={`${o.slug}-${i}`}>
              <Input
                type="checkbox"
                id={`${o.slug}-${i}`}
                value={o.slug}
                onChange={handleChange}
                checked={selection.includes(o.slug)}
              />
              <Label htmlFor={`${o.slug}-${i}`}>{o.label}</Label>
            </Field>
          ))}
        </Content>
      )}
    </Outer>
  )
}

export default Filter
