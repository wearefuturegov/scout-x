import React from "react"
import Alert from "@reach/alert"
import styled from "styled-components"
import theme from "../_theme"

const StyledAlert = styled(Alert)`
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 999;
    background: ${theme.text};
    padding: 20px;
    color: ${theme.white};
    font-weight: bold;
    pointer-events: none;
    box-shadow: 0px 2px 12px rgba(0,0,0,0.1);
    animation: popIn 5s ease-out;
    text-align: center;
    @media screen and (min-width: ${theme.breakpointM}){
        max-width: 400px;
        margin: 25px;
        text-align: left;
    }
    @keyframes popIn{
        0%{
            opacity: 0;
            transform: translateY(10px);
        }
        2%{
            opacity: 1;
            transform: translateY(0px);
        }
        97%{
            opacity: 1;
            transform: translateY(0px);
        }
        100%{
            opacity: 0;
            transform: translateY(10px);
        }
    }
`

export default ({
    children
}) => 
    <StyledAlert>
        {children}
    </StyledAlert>