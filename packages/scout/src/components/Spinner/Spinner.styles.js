import styled from "styled-components"

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

export const AbsoluteImg = styled(Img)`
  position: absolute;
  right: 14px;
  bottom: 13px;
  height: 20px;
`
