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
} from "./layout"
import tick from "./tick.svg"

const Input = styled.input`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 29px;
  height: 29px;
  opacity: 0;
  &:checked + label:after {
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
    opacity: ${props => (props.childSelected ? 0.5 : 1)};
  }
`

const InputFakeSelected = styled(Input)`
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
  foldable,
}) => {
  const [unfolded, setUnfolded] = useState(selection.length > 0 ? true : false)

  const handleChange = e => {
    let { checked, value } = e.target
    const [parent] = value.split(":")

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

      setSelection([...tmpSelection, value])
    } else {
      setSelection(selection.filter(el => el !== value))
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
      !isChild && hasSelectedChildren(value) ? InputFakeSelected : Input

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
            const isChecked = selection.includes(o.slug)
            return (
              <React.Fragment key={`${o.slug}-${i}`}>
                <FieldComponent
                  key={`${o.slug}-${i}`}
                  id={`${o.slug}-${i}`}
                  value={o.slug}
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
