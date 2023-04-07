import React from "react"

import { Crosshead, Columns } from "./DetailDialog.styles"
import { TickList, TickListItem } from "./../../"

const DetailDialogAccessNeeds = ({ location }) => {
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
