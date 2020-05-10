import React from "react"
import Alert from "@reach/alert"
import styled from "styled-components"
import theme from "../_theme"

const Outer = styled.div`
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 999;
    width: 100vw;
`

const StyledAlert = styled(Alert)`
    background: ${theme.text};
    padding: 20px;
    color: ${theme.white};
    font-weight: bold;
    pointer-events: none;
    font-size: 0.9rem;
    box-shadow: 0px 2px 12px rgba(0,0,0,0.1);
    animation: popIn 5s ease-out;
    text-align: center;
    @media screen and (min-width: ${theme.breakpointM}){
        max-width: 400px;
        margin: 0 auto 20px auto;
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
    <Outer>
        <StyledAlert>
            {children}
        </StyledAlert>
    </Outer>