import React from "react"

import { DetailDialogStyles } from "./../../components"
import { TickList, TickListItem } from "./../../components"

const DetailDialogSuitabilities = ({ suitabilities }) => {
  const { Crosshead, Columns } = DetailDialogStyles
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
