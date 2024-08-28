import React from "react"
import styled from "styled-components"

const SentenceWrapper = styled.div`
  .desktop {
    display: none;
  }
  .mobile {
    display: block;
  }

  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    .desktop {
      display: block;
    }
    .mobile {
      display: none;
    }
  }
`

const ResponsiveSentence = ({ desktop, mobile }) => {
  return (
    <SentenceWrapper>
      <span className="desktop">{desktop}</span>
      <span className="mobile">{mobile}</span>
    </SentenceWrapper>
  )
}

export default ResponsiveSentence
