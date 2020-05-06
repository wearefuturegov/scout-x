import styled from "styled-components"
import theme from "../_theme"

let styles = `
    display: inline-block;
    text-decoration: none;
    color: ${theme.link};
    padding: 15px 45px;
    border: 3px solid ${theme.link};
    font-size: 1rem;
    background: none;
    font-weight: bold;
    cursor: pointer;
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
`

export default styled.button`${styles}`

export const ButtonLink = styled.a`${styles}`

export const SecondaryButtonLink = styled(ButtonLink)`
    border: none;
    padding: 15px;
    margin-left: 15px;
`