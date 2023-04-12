import React, { useEffect, useState } from "react"

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
  const [unfolded, setUnfolded] = useState(
    selection && selection.length > 0 ? true : false
  )

  if (selection === undefined) {
    selection = []
  }

  const handleChange = async e => {
    console.log("handleChange", e)
    let { checked, value } = e.target

    try {
      let selectionData = checked
        ? [...selection, value]
        : selection.filter(el => el !== value)
      selectionSet = await setSelection(selectionData)
      pageSet = await setPage(1)
      return [selectionSet, pageSet]
    } catch (error) {}

    // try {
    //   let selectionData = checked
    //     ? (selection = [...selection, value])
    //     : selection.filter(el => el !== value)

    //   let selectionUpdate = await setSelection(selectionData)
    //   let pageUpdate = await setPage(1)
    //   return [selectionUpdate, pageUpdate]
    // } catch (error) {
    //   console.log(error)
    // }

    // if (checked) {
    //   await setSelection([...selection, value])
    // } else {
    //   await setSelection(selection.filter(el => el !== value))
    // }

    // console.log("hello")
    // setPage(1)
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
