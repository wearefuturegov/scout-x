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
`

export default styled.button`${styles}`

export const ButtonLink = styled.a`${styles}`

export const SecondaryButtonLink = styled(ButtonLink)`
    border: none;
    padding: 15px;
`