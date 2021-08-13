import React, { useState } from "react"
import styled from "styled-components"
import { Header, UnfoldButton, Content } from "./layout"

const Form = styled.form`
  border: none;
  margin-bottom: 20px;
`

const Field = styled.div`
  position: relative;
  margin-bottom: 7px;
`

const Label = styled.label`
  font-weight: bold;
  color: ${props => props.theme.styles.text};
  cursor: pointer;
`

const Input = styled.input`
  font-size: 0.9rem;
  padding: 7px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: 100%;
  padding-right: 65px;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    opacity: 0.3;
  }
`

const ApplyButton = styled.button`
  font-size: 0.8rem;
  background: ${props => props.theme.styles.text};
  color: ${props => props.theme.styles.white};
  border: none;
  padding: 8px 12px;
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  font-weight: bold;
  bottom: 0px;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
`

const HiddenLabel = styled.label`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`

const KeywordFilter = ({ value, setValue, setPage }) => {
  const [unfolded, setUnfolded] = useState(value ? true : false)

  const [localKeywords, setLocalKeywords] = useState(value)

  const handleSubmit = e => {
    e.preventDefault()
    setValue(localKeywords)
    setPage(1)
  }

  // const clear = () => {
  //     setLocalKeywords("")
  //     setValue("")
  //     setPage(1)
  // }

  return (
    <Form onSubmit={handleSubmit}>
      <Header>
        <UnfoldButton
          type="button"
          aria-expanded={unfolded ? "true" : "false"}
          onClick={() => setUnfolded(!unfolded)}
        >
          <Label>Keywords</Label>
        </UnfoldButton>
      </Header>
      {unfolded && (
        <Content>
          <Field>
            <HiddenLabel htmlFor="keywords">Keyword search</HiddenLabel>
            <Input
              id="keywords"
              placeholder="Search..."
              value={localKeywords}
              onChange={e => setLocalKeywords(e.target.value)}
            />
            <ApplyButton type="submit">Apply</ApplyButton>
          </Field>
        </Content>
      )}
    </Form>
  )
}

export default KeywordFilter
