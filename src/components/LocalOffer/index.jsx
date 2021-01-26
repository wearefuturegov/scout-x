import React, { useState } from "react"
import styled from "styled-components"
import theme from "../_theme"
import { truncate } from "../../lib/utils"
import upArrow from "./up-arrow.svg"
import downArrow from "./down-arrow.svg"
import A from "../A"
import { TickList, TickListItem } from "../TickList"

const Outer = styled.article`
  color: ${theme.text};
  p {
    line-height: 1.4;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`

const Link = styled(A)`
  font-weight: bold;
`

const Button = styled.button`
  color: ${theme.link};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: ${theme.text};
  }
  &:focus {
    background: ${theme.focus};
    outline: 3px solid ${theme.focus};
  }
  &:after {
    content: "";
    margin-left: 5px;
    display: inline-block;
    width: 12px;
    height: 9px;
    background-image: url(${downArrow});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  &[aria-expanded="true"]:after {
    background-image: url(${upArrow});
  }
`

const Panel = styled.div`
  margin-bottom: 25px;
`

const Subheading = styled.h3`
  margin-top: 30px;
  margin-bottom: 15px;
  color: ${theme.text};
  @media screen and (min-width: ${theme.breakpointM}) {
    margin-top: 45px;
  }
`

const List = styled(TickList)`
  margin-top: 0px;
  margin-bottom: 25px;
  list-style: none;
  @media screen and (min-width: ${theme.breakpointM}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 35px;
  }
`

const Response = styled.div`
  margin-bottom: 25px;
  p {
    margin-bottom: 5px;
  }
`

const LocalOffer = ({ description, link, survey_answers, sendNeeds }) => {
  const wordLimit = 30
  const [expanded, setExpanded] = useState(false)
  let paragraphs = description.split("\n").filter(paragraph => paragraph)

  return (
    <Outer>
      {expanded ? (
        <Panel>
          {paragraphs.map((paragraph, i) => (
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
