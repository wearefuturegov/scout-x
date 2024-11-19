import React, { useState } from "react"
import styled from "styled-components"
import {
  Outer,
  Legend,
  Label,
  Field,
  Header,
  UnfoldButton,
  Content,
  InputCheckbox,
} from "./layout"
import tick from "./tick.svg"

const InputFakeSelected = styled(InputCheckbox)`
  + label:after {
    position: absolute;
    content: "";
    display: block;
    height: 19px;
    width: 19px;
    left: 5px;
    top: 5px;
    background-image: url(${tick});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5;
  }
`

const ChildField = styled(Field)`
  margin-left: 40px;
`

const Filter = ({
  legend,
  options,
  selection,
  setSelection,
  setPage,
  meta,
  setMeta,
  foldable,
}) => {
  const [unfolded, setUnfolded] = useState(selection.length > 0 ? true : false)

  const handleChange = e => {
    let { checked, value } = e.target
    const [parent] = value.split(":")
    const isMeta = value.startsWith("meta-")
    value = isMeta ? value.replace("meta-", "") : value

    if (checked) {
      let tmpSelection = selection

      if (parent) {
        // parent can't exist on its own (if child is selected)
        tmpSelection = tmpSelection.filter(f => f !== parent)
      }

      if (hasSelectedChildren(value)) {
        // if selecting parent, remove all children
        tmpSelection = tmpSelection.filter(f => !f.startsWith(value))
      }

      if (isMeta) {
        setMeta([...tmpSelection, value])
      } else {
        setSelection([...tmpSelection, value])
      }
    } else {
      if (isMeta) {
        setMeta(selection.filter(el => el !== value))
      } else {
        setSelection(selection.filter(el => el !== value))
      }
    }
    setPage(1)
  }

  /**
   * Returns true or false if the parent has children in the array eg
   * ['parent1:child1', 'parent1:child2'] parent = 'parent1' would return true
   * @param {*} parent
   * @returns
   */
  const hasSelectedChildren = parent =>
    selection.find(f => f.includes(parent)) ? true : false

  /**
   * Field component
   * @param {*} param0
   * @returns
   */
  const FieldComponent = ({ id, value, checked, label, isChild }) => {
    const Component = isChild ? ChildField : Field
    const InputComponent =
      !isChild && hasSelectedChildren(value) ? InputFakeSelected : InputCheckbox

    return (
      <Component>
        <InputComponent
          type="checkbox"
          id={id}
          value={value}
          onChange={handleChange}
          checked={checked}
        />
        <Label htmlFor={id}>{label}</Label>
      </Component>
    )
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
          {options.map((o, i) => {
            let isChecked = selection.includes(o.slug)
            let value = o.slug
            const isMetaOption = o.type === "meta"
            if (isMetaOption) {
              value = `meta-${o.slug}:${o.value}`
              isChecked = meta.includes(value.replace("meta-", ""))
            }
            return (
              <React.Fragment key={`${o.slug}-${i}`}>
                <FieldComponent
                  key={`${value}-${i}`}
                  id={`${value}-${i}`}
                  value={value}
                  checked={isChecked}
                  label={o.label}
                />
                {o.children &&
                  o.children.map((c, j) => {
                    const isChildChecked = selection.includes(
                      `${o.slug}:${c.slug}`
                    )
                    return (
                      <FieldComponent
                        key={`${o.slug}:${c.slug}-${j}`}
                        id={`${o.slug}:${c.slug}-${j}`}
                        value={`${o.slug}:${c.slug}`}
                        checked={isChildChecked}
                        label={c.label}
                        isChild
                      />
                    )
                  })}
              </React.Fragment>
            )
          })}
        </Content>
      )}
    </Outer>
  )
}

export default Filter
