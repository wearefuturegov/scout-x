import React from "react"
import { Outer, Button } from "./ClearFilters.styles"

const ClearFilters = ({ clearFilters }) => {
  const actionClearFilters = e => {
    e && e.preventDefault()

    clearFilters()
    // setPage(1)

    // clearCategory(false)

    // clearSubCategory([])

    // Object.keys(filters).forEach(function (key) {
    //   filters[key].clear.map((clr, i) => clr(filters[key].clearValue[i]))
    // })
  }

  return (
    <Outer>
      <Button onClick={actionClearFilters}>Clear all filters</Button>
    </Outer>
  )
}

export default ClearFilters
