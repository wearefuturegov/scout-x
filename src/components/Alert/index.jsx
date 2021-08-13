import React from "react"
import Alert from "@reach/alert"
import { Link } from "@reach/router"
import styled from "styled-components"

const StyledAlert = styled(Alert)`
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 999;
  background: ${props => props.theme.styles.text};
  padding: 20px;
  color: ${props => props.theme.styles.white};
  /* pointer-events: none; */
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  animation: popIn 5s ease-out;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    max-width: 400px;
    margin: 25px;
    text-align: left;
  }
  @keyframes popIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    2% {
      opacity: 1;
      transform: translateY(0px);
    }
    97% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }
`

const StyledLink = styled(Link)`
  font-weight: bold;
  color: ${props => props.theme.styles.white};
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
    background: ${props => props.theme.styles.focus};
  }
`

export default ({ children, link, linkText }) => (
  <StyledAlert>
    {children}
    {link && <StyledLink to={link}>{linkText}</StyledLink>}
  </StyledAlert>
)
