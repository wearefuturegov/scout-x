import React from "react"

import { Button } from "../../"

import { SecondaryButton, ResultsFooter } from "./Pagination.styles"

const Pagination = ({
  totalPages,
  currentPage,
  setNextPage,
  setPreviousPage,
  scrollTarget,
}) => {
  return (
    totalPages > 0 && (
      <ResultsFooter>
        {totalPages > currentPage && (
          <Button
            onClick={() => {
              scrollTarget.current.scrollIntoView()
              setNextPage()
            }}
          >
            Next page (to page {currentPage + 1})
          </Button>
        )}
        {currentPage > 1 && (
          <SecondaryButton
            onClick={() => {
              scrollTarget.current.scrollIntoView()
              setPreviousPage()
            }}
          >
            Previous page (to page {currentPage - 1})
          </SecondaryButton>
        )}
      </ResultsFooter>
    )
  )
}

export default Pagination
