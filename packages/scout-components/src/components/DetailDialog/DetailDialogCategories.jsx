import React from "react"

import { Crosshead, Columns } from "./DetailDialog.styles"
import { A } from "./../../"

const DetailDialogCategories = ({ categories }) => {
  return (
    <Columns>
      <Crosshead>Categories</Crosshead>
      <p>{categories.map(taxon => taxon.name).join(", ")}</p>
    </Columns>
  )
}

export default DetailDialogCategories
