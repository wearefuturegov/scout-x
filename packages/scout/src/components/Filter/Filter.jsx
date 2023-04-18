import React, { useEffect, useState } from "react"

import { FilterStyles } from "./"
import { useNavigate } from "react-router-dom"

const Filter = ({
  legend,
  options,
  selection,
  setSelection,
  setPage,
  foldable,
}) => {
  const {
    Input,
    Outer,
    Legend,
    Label,
    Field,
    Header,
    UnfoldButton,
    Content,
  } = FilterStyles
  const [unfolded, setUnfolded] = useState(
    selection && selection.length > 0 ? true : false
  )

  let navigate = useNavigate()
  if (selection === undefined) {
    selection = []
  }

  const handleChange = async e => {
    let { checked, value } = e.target

    try {
      let selectionData = checked
        ? [...selection, value]
        : selection.filter(el => el !== value)
      let selectionSet = await setSelection(selectionData)
      let pageSet = await setPage(1)
      // await navigate("?only=free&page=1")

      // return [selectionSet, pageSet]
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
