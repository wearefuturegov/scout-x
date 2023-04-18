import React from "react"

import { DetailDialogStyles } from "./../../components"
import { A } from "./../../components"

const DetailDialogLinks = ({ links }) => {
  const { Crosshead, Columns } = DetailDialogStyles
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
