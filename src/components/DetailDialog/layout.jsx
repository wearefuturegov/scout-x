import styled from "styled-components"
import theme from "../_theme"
import { Body } from "../Dialog"

export const DarkBody = styled(Body)`
    background: ${theme.pale};
`

export const Caption = styled.p`
    color: ${theme.grey};
    margin-bottom: 10px;
    font-size: 1.1rem;
    @media screen and (min-width: ${theme.breakpointM}){
        font-size: 1.2rem;
    }
`

export const A = styled.a`
    color: ${theme.link};
    &:hover{
        text-decoration: none
    }
    &:focus{
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
`

export const Actions = styled.div`
    margin-bottom: 30px;
    a:first-of-type{
        margin-bottom: 25px;
    }
    @media screen and (min-width: ${theme.breakpointM}) {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 40px;
        a:first-of-type{
            margin-bottom: 0px;
            margin-right: 30px;
        }
    }
`

export const Tags = styled.div`
    margin-top: 8px;
`

export const Tag = styled.span`
    display: inline-block;
    padding: 5px;
    font-size: 0.8rem;
    color: ${theme.link};
    background: ${theme.linkBackground};
    border-radius: 2px;
    margin-right: 7px;
    margin-top: 7px;
`

export const Location = styled.section`
    display: none;
    padding: 45px;
    min-height: 250px;
    position: relative;
    @media screen and (min-width: ${theme.breakpointM}) {
        display: block;
    }
`

export const LocationInner = styled.div`
    display: block;
    position: relative;
    background: ${theme.white};
    padding: 25px;
    width: 100%;
    max-width: 270px;

`

export const Crosshead = styled.h3`
    margin-bottom: 5px;
    color: ${theme.text};
`

export const SplitContent = styled.section`
    @media screen and (min-width: ${theme.breakpointM}){
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 45px;
    }
`

export const SplitContentSection = styled.aside`
    margin-bottom: 25px;    
    @media screen and (min-width: ${theme.breakpointM}){
        margin-bottom: 0px;
    }
`

export const Disclaimer = styled.footer`
    padding: 25px;
    text-align: center;
    p{
        max-width: 550px;
        margin: 0 auto 10px auto;
    }
`