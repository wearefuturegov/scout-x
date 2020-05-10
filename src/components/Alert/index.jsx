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
    padding: 15px;
    color: ${theme.white};
    font-weight: bold;
    box-shadow: 0px 2px 12px ${theme.textBackground};
    animation: popIn 5s ease-out;
    @media screen and (min-width: ${theme.breakpointM}){
        max-width: 400px;
        margin: 0 auto 20px auto;
    }
    @keyframes popIn{
        0%{
            opacity: 0;
            transform: translateY(10px);
        }
        3%{
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