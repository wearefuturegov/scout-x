import styled from "styled-components"
import theme from "./_theme"

export default styled.a`
    color: ${theme.link};
    &:hover{
        text-decoration: none;
    }
    &:focus{
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
`