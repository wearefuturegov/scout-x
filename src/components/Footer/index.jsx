import React from "react"
import styled from "styled-components"
import theme from "../_theme"

const Outer = styled.footer`
    background: ${theme.text};
    color: ${theme.white};
    padding: 60px ${theme.outerSpacing};
    @media screen and (min-width: ${theme.breakpointM}){
        padding: 80px ${theme.outerSpacing};
    }
`

const Inner = styled.div`
    max-width: ${theme.maxWidth};
    margin-left: auto;
    margin-right: auto;
`

const Footer = ({
    children
}) =>
    <Outer>
        <Inner>
            © 2020 Buckinghamshire Council
        </Inner>
    </Outer>

export default Footer