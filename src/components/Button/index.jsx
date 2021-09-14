import styled from "styled-components"

import { theme } from "./../../themes/theme_generator"

const link = theme.styles.link
const linkHover = theme.styles.linkHover
const linkActive = theme.styles.linkActive
const focus = theme.styles.focus
const breakpointM = theme.styles.breakpointM
const text = theme.styles.text

let styles = `
    display: inline-block;
    text-decoration: none;
    color: ${link};
    padding: 15px 45px;
    text-align: center;
    border: 3px solid ${link};
    font-size: 1rem;
    background: none;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    &:focus{
        outline: 3px solid ${focus}
    }
    &:hover{
        color: ${linkHover};
        border-color: ${linkHover}
    }
    &:active{
        color: ${linkActive};
        border-color: ${linkActive}
    }
    @media screen and (min-width: ${breakpointM}){
        width: inherit;
    }
    &:disabled{
        background: ${text};
        pointer-events: none;
        border-color: ${text};
    }
`

const Button = styled.button`
  ${styles}
`

export default Button

export const SolidButton = styled(Button)`
  background: ${props => props.theme.styles.link};
  color: ${props => props.theme.styles.white};
  &:hover {
    color: ${props => props.theme.styles.white};
    background: ${props => props.theme.styles.linkHover};
  }
  &:active {
    color: ${props => props.theme.styles.white};
    background: ${props => props.theme.styles.linkActive};
  }
`

export const ButtonLink = styled.a`
  ${styles}
`
