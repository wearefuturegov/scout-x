import styled from "styled-components"
import theme from "../_theme"

const Button = styled.button`
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

export default Button