import React from "react"
import theme from "../_theme"
import styled from "styled-components"
import Button from "../Button"
import { ResultsFooter } from "../Layout"

const SecondaryButton = styled.button`
  font-size: 1rem;
  color: ${theme.link};
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 25px;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: 3px solid ${theme.focus};
    background: ${theme.focus};
  }
  &:active {
    color: ${theme.linkActive};
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
