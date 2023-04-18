import React, { useState } from "react"

import { TickListItem } from "./../../components"
import { truncate } from "~/src/utils"

import {
  Outer,
  Link,
  Subheading,
  List,
  Response,
  Panel,
  Button,
} from "./LocalOffer.styles.js"

const LocalOffer = ({ description, link, survey_answers, sendNeeds }) => {
  const wordLimit = 30
  const [expanded, setExpanded] = useState(false)
  let paragraphs = description?.split("\n").filter(paragraph => paragraph)

  return (
    <Outer>
      {expanded ? (
        <Panel>
          {paragraphs?.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {link && <Link href={link}>See latest SEND report</Link>}
          {sendNeeds.length > 0 && (
            <>
              <Subheading>SEND needs met</Subheading>
              <List>
                {sendNeeds.map(need => (
                  <TickListItem key={need.id}>{need.name}</TickListItem>
                ))}
              </List>
            </>
          )}
          <Subheading>More about their support</Subheading>
          {survey_answers.map(
            response =>
              response.answer && (
                <Response key={response.question}>
                  <p>
                    <strong>{response.question}</strong>
                  </p>
                  <p>{response.answer}</p>
                </Response>
              )
          )}
        </Panel>
      ) : (
        <p>{truncate(description, wordLimit)}</p>
      )}
      <Button
        aria-expanded={expanded ? "true" : "false"}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Less" : "More"}
      </Button>
    </Outer>
  )
}

export default LocalOffer
