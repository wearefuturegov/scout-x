import React from "react"

import { Crosshead, Columns } from "./DetailDialog.styles"
import { A } from "./../../"

const DetailDialogLinks = ({ links }) => {
  return (
    <Columns>
      <Crosshead>Links</Crosshead>
      <div>
        {links.map(link => (
          <p key={link.url}>
            <A href={link.url}>{link.label}</A>
          </p>
        ))}
      </div>
    </Columns>
  )
}

export default DetailDialogLinks
