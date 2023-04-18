import React from "react"

import { DetailDialogStyles } from "./../../components"
import { LocalOffer } from "./../../components"

const DetailDialogLocalOffer = ({ localOffer, sendNeeds }) => {
  const { Crosshead } = DetailDialogStyles
  return (
    <>
      <Crosshead>SEND support (Local Offer)</Crosshead>
      <LocalOffer {...localOffer} sendNeeds={sendNeeds} />
    </>
  )
}

export default DetailDialogLocalOffer
