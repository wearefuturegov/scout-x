import React from "react"

import { Button } from "../../"

import { SecondaryButton, ResultsFooter } from "./Pagination.styles"

const Pagination = ({ totalPages, currentPage, setPage, scrollTarget }) => {
  return (
    totalPages > 0 && (
      <ResultsFooter>
        {totalPages > currentPage && (
          <Button
            onClick={() => {
              scrollTarget.current.scrollIntoView()
              setPage(currentPage + 1)
            }}
          >
            Next page
          </Button>
        )}
        {currentPage > 1 && (
          <SecondaryButton
            onClick={() => {
              scrollTarget.current.scrollIntoView()
              setPage(currentPage - 1)
            }}
          >
            Previous page
          </SecondaryButton>
        )}
      </ResultsFooter>
    )
  )
}

export default Pagination
