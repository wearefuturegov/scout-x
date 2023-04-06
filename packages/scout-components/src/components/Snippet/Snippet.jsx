import React from "react"
import { Outer, Headline } from "./Snippet.styles"

import { A } from "./../"

const Snippet = ({ snippet }) => (
  <Outer>
    <Headline>{snippet.name}</Headline>
    <p>
      {snippet.description} <A href={snippet.href}>Visit now</A>
    </p>
  </Outer>
)

export default Snippet
