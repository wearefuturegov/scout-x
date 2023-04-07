import React from "react"

import { Crosshead, Columns } from "./DetailDialog.styles"
import { TickList, TickListItem } from "./../../"

const DetailDialogSuitabilities = ({ suitabilities }) => {
  return (
    <Columns>
      <Crosshead>Suitable for</Crosshead>
      <TickList>
        {suitabilities.map(point => (
          <TickListItem key={point.name}>{point.name}</TickListItem>
        ))}
      </TickList>
    </Columns>
  )
}

export default DetailDialogSuitabilities
