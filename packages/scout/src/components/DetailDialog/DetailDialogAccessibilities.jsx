import React from "react"

import { DetailDialogStyles } from "./../../components"
import { TickList, TickListItem } from "./../../components"

const DetailDialogAccessNeeds = ({ location }) => {
  const { Crosshead, Columns } = DetailDialogStyles
  return (
    <Columns>
      <Crosshead>Access needs</Crosshead>
      <TickList>
        {location.accessibilities.map(point => (
          <TickListItem key={point.name}>{point.name}</TickListItem>
        ))}
      </TickList>
    </Columns>
  )
}

export default DetailDialogAccessNeeds
