import React from "react"

const Twitter = ({ fillColor }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="m7.03 6.289 6.517 9.362h1.416L8.445 6.29H7.03Z"
      fill={fillColor || ""}
    ></path>
    <path
      fill-rule="evenodd"
      d="M11 22c6.075 0 11-4.925 11-11S17.075 0 11 0 0 4.925 0 11s4.925 11 11 11Zm4.884-16.408-3.89 4.541 4.231 6.184h-3.112l-2.849-4.164-3.567 4.164h-.922l4.08-4.763-4.08-5.962h3.112l2.698 3.943 3.378-3.943h.921Z"
      clip-rule="evenodd"
      fill={fillColor || ""}
    ></path>
  </svg>
)

export default Twitter
