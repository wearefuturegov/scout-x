import React from "react"
import { AStrong } from "../A"

const SingleStrongLink = ({ url, text }) => {
  return (
    <p>
      <AStrong href={url}>{text}</AStrong>
    </p>
  )
}
export default SingleStrongLink
