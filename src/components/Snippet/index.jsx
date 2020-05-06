import React from "react"
import styled from "styled-components"
import theme from "../_theme"

const Outer = styled.div`
    margin-bottom: 15px;
    padding: 20px 25px;
    background-color: ${theme.focus}1A;
    border: 2px solid ${theme.focus};
    color: ${theme.text};
    line-height: 1.4;
`

const Headline = styled.h3`
    margin-bottom: 10px;
`

const A = styled.a`
    &:hover{
        text-decoration: none;
    }
    &:focus{
        color: ${theme.text};
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
`

const Snippet = ({
    snippet
}) =>
    <Outer>
        <Headline>{snippet.name}</Headline>
        <p>{snippet.description} <A href={snippet.href}>Visit now</A></p>
    </Outer>

export default Snippet