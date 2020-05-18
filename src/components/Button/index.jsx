import styled from "styled-components"
import theme from "../_theme"

let styles = `
    display: inline-block;
    text-decoration: none;
    color: ${theme.link};
    padding: 15px 45px;
    text-align: center;
    border: 3px solid ${theme.link};
    font-size: 1rem;
    background: none;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    &:focus{
        outline: 3px solid ${theme.focus}
    }
    &:hover{
        color: ${theme.linkHover};
        border-color: ${theme.linkHover}
    }
    &:active{
        color: ${theme.linkActive};
        border-color: ${theme.linkActive}
    }
    @media screen and (min-width: ${theme.breakpointM}){
        width: inherit;
    }
    &:disabled{
        background: ${theme.text};
        pointer-events: none;
        border-color: ${theme.text};
    }
`

const Button = styled.button`${styles}`

export default Button

export const SolidButton = styled(Button)`
    background: ${theme.link};
    color: ${theme.white};
    &:hover{
        color: ${theme.white};
        background: ${theme.linkHover}
    }
    &:active{
        color: ${theme.white};
        background: ${theme.linkActive}
    }
`

export const ButtonLink = styled.a`${styles}`