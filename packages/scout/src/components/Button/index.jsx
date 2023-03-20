import styled from "styled-components"

import { theme } from "./../../themes/theme_generator"

let styles = `
    display: inline-block;
    text-decoration: none;
    color: ${theme.styles.link};
    padding: 15px 45px;
    text-align: center;
    border: 3px solid ${theme.styles.link};
    font-size: 1rem;
    background: none;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    &:focus{
        outline: 3px solid ${theme.styles.focus}
    }
    &:hover{
        color: ${theme.styles.linkHover};
        border-color: ${theme.styles.linkHover}
    }
    &:active{
        color: ${theme.styles.linkActive};
        border-color: ${theme.styles.linkActive}
    }
    @media screen and (min-width: ${theme.styles.breakpointM}){
        width: inherit;
    }
    &:disabled{
        background: ${theme.styles.text};
        pointer-events: none;
        border-color: ${theme.styles.text};
    }
`

const solidStyle = `
  background: ${theme.styles.link};
  color: ${theme.styles.white};
  &:hover {
    color: ${theme.styles.white};
    background: ${theme.styles.linkHover};
  }
  &:active {
    color: ${theme.styles.white};
    background: ${theme.styles.linkActive};
  }
`

const Button = styled.button`
  ${styles}
`

export default Button

export const SolidButton = styled(Button)`
  ${solidStyle}
`

export const ButtonLink = styled.a`
  ${styles}
`
export const SolidButtonLink = styled(ButtonLink)`
  ${solidStyle}
`

export const SolidButtonLinkPrimary = styled(ButtonLink)`
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
