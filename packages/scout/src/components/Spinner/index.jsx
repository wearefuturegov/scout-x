import React from "react"
import styled from "styled-components"
import loader from "./spinner-blue.svg"

const Img = styled.img`
  animation: spin 1s infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const AbsoluteImg = styled(Img)`
  position: absolute;
  right: 14px;
  bottom: 13px;
  height: 20px;
`

const Loader = ({ alt }) => <AbsoluteImg src={loader} alt={alt || ""} />

export default Loader
