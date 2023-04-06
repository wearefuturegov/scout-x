import React from "react"

import styled from "styled-components"
import { Button } from "@outpost-platform/scout-components"
import { ResultsFooter } from "../Layout"

const SecondaryButton = styled.button`
  font-size: 1rem;
  color: ${props => props.theme.styles.link};
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 25px;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
    background: ${props => props.theme.styles.focus};
  }
  &:active {
    color: ${props => props.theme.styles.linkActive};
  }
`

const Pagination = ({ totalPages, page, setPage, scrollTarget }) =>
  totalPages > 0 && (
    <ResultsFooter>
      {totalPages > page && (
        <Button
          onClick={() => {
            scrollTarget.current.scrollIntoView()
            setPage(page + 1)
          }}
        >
          Next page
        </Button>
      )}
      {page > 1 && (
        <SecondaryButton
          onClick={() => {
            scrollTarget.current.scrollIntoView()
            setPage(page - 1)
          }}
        >
          Previous page
        </SecondaryButton>
      )}
    </ResultsFooter>
  )

export default Pagination
