import React from "react"
import theme from "../_theme"
import styled from "styled-components"

const Outer = styled.ul`
    list-style: none;
    color: ${theme.text};
    margin-bottom: 25px;
    @media screen and (min-width: ${theme.breakpointM}){
        margin-bottom: 45px;
    }
`

const Crumb = styled.li`
    display: inline-block;
    margin-right: 10px;
    font-size: 0.9rem;
    &:after{
        margin-left: 10px;
        content: "/";
        opacity: 0.5;
    }
    &:last-of-type{
        margin-right: 0px;
        &:after{
            content: none;
        }
    }
    @media screen and (min-width: ${theme.breakpointM}){
        font-size: 1rem;
    }
`

const Link = styled.a`
    color: ${theme.link};
    text-decoration: none;
    &:hover{
        text-decoration: underline;
    }
    &:focus{
        outline: 3px solid ${theme.focus};
        background: ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
`

const Breadcrumbs = () =>
    <Outer>
        <Crumb>
            <Link href="https://www.buckinghamshire.gov.uk/">Home</Link>
        </Crumb>
        <Crumb>
            <Link href="https://familyinfo.buckinghamshire.gov.uk/">Children and families</Link>
        </Crumb>
        <Crumb>Find activities and organisations</Crumb>
    </Outer>
    
export default Breadcrumbs