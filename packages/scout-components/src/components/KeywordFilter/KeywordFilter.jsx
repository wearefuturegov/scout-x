import React, { useState } from "react"
import { Header, UnfoldButton, Content } from "./../../"

import {
  Form,
  Field,
  Label,
  Input,
  ApplyButton,
  HiddenLabel,
} from "./KeywordFilter.styles"

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
