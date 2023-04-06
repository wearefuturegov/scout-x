import React from "react"
import loader from "./spinner-blue.svg"
import { AbsoluteImg } from "./Spinner.styles"

const Loader = ({ alt }) => <AbsoluteImg src={loader} alt={alt || ""} />

export default Loader
