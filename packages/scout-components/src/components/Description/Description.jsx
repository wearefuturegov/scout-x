import React, { useState } from "react"
import { Outer, Button } from "./Description.styles"
import { truncate } from "../../utils"

const Description = ({ description }) => {
  const wordLimit = 30

  const [expanded, setExpanded] = useState(false)

  let paragraphs = description.split("\n").filter(paragraph => paragraph)

  return (
    <Outer>
      {description.split(" ").length > wordLimit ? (
        <>
          {expanded ? (
            paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)
          ) : (
            <p>{truncate(description, wordLimit)}</p>
          )}
          <Button
            aria-expanded={expanded ? "true" : "false"}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Less" : "More"}
          </Button>
        </>
      ) : (
        paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)
      )}
    </Outer>
  )
}

export default Description
