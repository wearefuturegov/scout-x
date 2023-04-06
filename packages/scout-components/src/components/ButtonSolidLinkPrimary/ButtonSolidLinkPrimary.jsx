import styled from "styled-components"

import ButtonLink from "../ButtonLink"
import { theme } from "./../../themes/theme_generator"

const ButtonSolidLinkPrimary = styled(ButtonLink)`
  color: ${theme.styles.primaryText};
  background: ${theme.styles.primary};
  border: 0;
  border-bottom: 4px solid ${theme.styles.primaryCompanion};
  &:hover {
    background: ${theme.styles.primaryHover};
    color: ${theme.styles.primaryHoverText};
    border-bottom: 4px solid ${theme.styles.primaryCompanion};
  }
  &:active {
    background: ${theme.styles.primaryHover};
    border-bottom: 0;
    border-top: 4px solid ${theme.styles.primaryCompanion};
  }
  &:focus {
    outline: none;
    background-color: ${theme.styles.focus};
    border-bottom: 4px solid ${theme.styles.primaryText};
    border-top: none;
    color: ${theme.styles.primaryText};
  }
`

export default ButtonSolidLinkPrimary
