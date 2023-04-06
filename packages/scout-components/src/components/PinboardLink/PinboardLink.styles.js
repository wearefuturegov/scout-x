import styled from "styled-components"

import { Link } from "@reach/router"

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

export { StyledLink, Count }
