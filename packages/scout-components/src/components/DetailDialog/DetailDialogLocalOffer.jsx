import React from "react"

import { Crosshead } from "./DetailDialog.styles"
import { LocalOffer } from "./../../"

const DetailDialogLocalOffer = ({ localOffer, sendNeeds }) => {
  return (
    <>
      <Crosshead>SEND support (Local Offer)</Crosshead>
      <LocalOffer {...localOffer} sendNeeds={sendNeeds} />
    </>
  )
}

export default DetailDialogLocalOffer
