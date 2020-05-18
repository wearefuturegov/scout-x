import styled from "styled-components"
import theme from "../_theme"
import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"

export const Outer = styled.fieldset`
    border: none;
    margin-bottom: 10px;
    @media screen and (min-width: ${theme.breakpointM}) {
        margin-bottom: 15px;   
    }
`

export const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`

export const UnfoldButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    font-size: 1rem;
    background: none;
    cursor: pointer;
    &:after{
        content: "";
        display: inline-block;
        height: 10px;
        width: 15px;
        margin-left: 10px;
        background-image: url(${upArrow});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    &[aria-expanded=true]:after{
        background-image: url(${downArrow});
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

export const Legend = styled.legend`
    font-weight: bold;
    color: ${theme.text};
`

export const Content = styled.div`
    margin-bottom: 25px;
`

export const Field = styled.div`
    position: relative;
    margin-bottom: 7px;
    padding: 4.5px 0px 4.5px 40px;
    &:focus-within label:before{
        outline: 3px solid ${theme.focus};
    }
`

export const Label = styled.label`
    color: ${theme.text};
    cursor: pointer;
    &:before{
        content: "";
        display: inline-block;
        background: ${theme.white};
        border: 2px solid ${theme.text};
        width: 25px;
        height: 25px;
        position: absolute;
        left: 0px;
        top: 0px;
    }
`

export const ClearButton = styled.button`
    color: ${theme.link};
    font-size: 0.9rem;
    background: none;
    border: none;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
    &:focus{
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
`