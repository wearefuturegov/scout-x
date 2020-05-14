import styled from "styled-components"
import theme from "../_theme"



export const Header = styled.header`
    padding: 30px;
    @media screen and (min-width: ${theme.breakpointM}){
        padding: 45px;
    }
`

export const Body = styled.div`
    padding: 30px;
    @media screen and (min-width: ${theme.breakpointM}){
        padding: 45px;
    }
`

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

export const Title = styled.h1`
    color: ${theme.text};
    margin-bottom: 0px;
    font-size: 1.5rem;
    @media screen and (min-width: ${theme.breakpointM}){
        font-size: 2rem;
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
    position: relative;
    padding: 30px;
    min-height: 250px;
    @media screen and (min-width: ${theme.breakpointM}) {
        padding: 45px;
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

export const Link = styled.a`
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

export const SplitContent = styled.section``

export const SplitContentSection = styled.aside``

export const Disclaimer = styled.footer`
    padding: 30px;
    text-align: center;
    @media screen and (${theme.breakpointM}){
            padding: 45px;
    }
    p{
        max-width: 550px;
        margin: 0 auto 10px auto;
    }
    a{
        color: ${theme.link};
        &:hover{
            text-decoration: none;
        }
        &:focus{
            background: ${theme.focus};
            outline: 1px solid ${theme.focus};
        }
        &:active{
            color: ${theme.text};
        }
    }
`