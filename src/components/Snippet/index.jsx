import React from "react"
import styled from "styled-components"

import A from "../A"

const Outer = styled.div`
  margin-bottom: 15px;
  padding: 20px 25px;
  background-color: ${props => props.theme.styles.focus}1A;
  border: 2px solid ${props => props.theme.styles.focus};
  color: ${props => props.theme.styles.text};
  line-height: 1.4;
`

const Headline = styled.h3`
  margin-bottom: 10px;
`

const Snippet = ({ snippet }) => (
  <Outer>
    <Headline>{snippet.name}</Headline>
    <p>
      {snippet.description} <A href={snippet.href}>Visit now</A>
    </p>
  </Outer>
)

export default Snippet
