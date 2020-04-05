import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import tick from "./tick.svg"

const Outer = styled.fieldset`
    border: none;
    margin-bottom: 25px;
    @media screen and (min-width: ${theme.breakpointM}){
        margin-bottom: 35px;
    }
`

const Legend = styled.legend`
    font-weight: bold;
    color: ${theme.text};
    margin-bottom: 15px;
`

const Field = styled.div`
    position: relative;
    margin-bottom: 7px;
    padding: 4.5px 0px 4.5px 40px;
    &:focus-within label:before{
        outline: 3px solid ${theme.focus};
    }
`

const Label = styled.label`
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

const Input = styled.input`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 29px;
    height: 29px;
    opacity: 0;
    &:checked + label:after{
        position: absolute;
        content: "";
        display: block;
        height: 19px;
        width: 19px;
        left: 5px;
        top: 5px;
        background-image: url(${tick});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
`

const Filter = ({
    legend,
    options
}) =>
    <Outer>
        <Legend>{legend}</Legend>
        {options.map(o =>
            <Field key={o.value}>
                <Input type="checkbox" id={o.value}/>
                <Label htmlFor={o.value}>{o.label}</Label>
            </Field>
        )}
    </Outer>

export default Filter