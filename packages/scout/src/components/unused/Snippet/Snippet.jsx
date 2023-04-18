import React from "react"
import { Headline, Outer } from "./Snippet.styles"

import { A } from "./../../../components"

const Snippet = ({ snippet }) => (
  <Outer>
    <Headline>{snippet.name}</Headline>
    <p>
      {snippet.description} <A href={snippet.href}>Visit now</A>
    </p>
  </Outer>
)

export default Snippet
