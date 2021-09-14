import React from "react"
import styled from "styled-components"

import { Link } from "@reach/router"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"

const StyledLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px;
  border: 3px solid ${props => props.theme.styles.link};
  margin-bottom: 25px;
  color: ${props => props.theme.styles.link};
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.styles.linkHover};
    border-color: ${props => props.theme.styles.linkHover};
  }
  &:active {
    color: ${props => props.theme.styles.linkActive};
    border-color: ${props => props.theme.styles.linkActive};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
`

const Count = styled.span`
  margin-left: 5px;
  font-weight: normal;
`

const PinboardLink = ({ pinboard, location }) =>
  pinboard.length > 0 ? (
    <StyledLink to={`/pinboard${location.search}`}>
      See pinned services
      <Count>({pinboard.length})</Count>
    </StyledLink>
  ) : null

export default props => (
  <PinboardContextConsumer>
    {pinContext => <PinboardLink {...pinContext} {...props} />}
  </PinboardContextConsumer>
)
