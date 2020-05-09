import React, {useState} from "react"
import styled from "styled-components"
import theme from "../_theme"
import downArrow from "./down-arrow.svg";
import upArrow from "./up-arrow.svg";

const MobileOuter = styled.section`
    @media screen and (min-width: ${theme.breakpointM}){
        display: none;
    }
    margin-bottom: 35px;
    fieldset:first-of-type{
        margin-top: 20px;
    }
`
const DesktopOuter = styled.section`
    display: none;
    @media screen and (min-width: ${theme.breakpointM}){
        display: block;
    }
`

const Button = styled.button`
    width: 100%;
    padding: 10px 0px;
    text-align: left;
    color: ${theme.text};
    font-size: 1.1rem;
    margin-top: 0px;
    border: none;
    background: none;
    border-bottom: 4px solid ${theme.text};
    font-weight: bold;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
    &:after{
        content: "";
        display: inline-block;
        width: 18px;
        height: 18px;
        background-image: url(${downArrow});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    &[aria-expanded=true]:after{
        background-image: url(${upArrow});
    }
`

const Filters = ({
    legend,
    options,
    children
}) => {
    const [open, setOpen] = useState(false)

    return(
        <>
            <MobileOuter open>
                <Button 
                    onClick={() => setOpen(!open)}
                    aria-expanded={open ? "true" : "false"}
                >
                    {open ? "Hide filters" : "Show filters"}
                </Button>
                {open && children}
            </MobileOuter>
            <DesktopOuter>
                {children}
            </DesktopOuter>
        </>
    )
}

export default Filters