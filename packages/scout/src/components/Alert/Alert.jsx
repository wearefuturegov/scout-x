import React from "react"
import { StyledLink, StyledAlert } from "./Alert.styles"
export default ({ children, link, linkText }) => (
  <StyledAlert>
    {children}
    {link && <StyledLink to={link}>{linkText}</StyledLink>}
  </StyledAlert>
)
