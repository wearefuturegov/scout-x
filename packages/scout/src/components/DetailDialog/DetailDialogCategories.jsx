import React from "react"

import { DetailDialogStyles } from "./../../components"

const DetailDialogCategories = ({ categories }) => {
  const { Crosshead, Columns } = DetailDialogStyles
  return (
    <Columns>
      <Crosshead>Categories</Crosshead>
      <p>{categories.map(taxon => taxon.name).join(", ")}</p>
    </Columns>
  )
}

export default DetailDialogCategories
