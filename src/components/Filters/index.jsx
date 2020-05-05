import React, {useState} from "react"
import styled from "styled-components"
import theme from "../_theme"

const MobileOuter = styled.section`
    @media screen and (min-width: ${theme.breakpointM}){
        display: none;
    }
    margin-bottom: 25px;
    fieldset:first-of-type{
        margin-top: 20px;
    }
    fieldset:last-of-type{
        margin-bottom: 0px;
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
    padding: 10px 20px;
    color: ${theme.link};
    font-size: 1rem;
    margin-top: 0px;
    background: ${theme.link}1A;
    border: none;
    font-weight: bold;
    cursor: pointer;
    &:hover{
        /* text-decoration: underline; */
    }
    &:focus{
        /* background: ${theme.focus}; */
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
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