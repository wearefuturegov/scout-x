import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import tick from "./tick.svg"

const Outer = styled.fieldset`
    border: none;
    margin-bottom: 25px;
`

const Legend = styled.legend`
    font-weight: bold;
    color: ${theme.text};
    margin-bottom: 15px;
`

const Field = styled.div`
    position: relative;
    margin-bottom: 5px;
    padding: 4.5px 0px 4.5px 40px;
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
        left: 4px;
        top: 4px;
        background-image: url(${tick});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
`


const Filter = () =>
    <Outer>
        <Legend>Filter</Legend>
        <Field>
            <Input type="checkbox" checked/>
            <Label>Example</Label>
        </Field>
        <Field>
            <Input type="checkbox"/>
            <Label>Example</Label>
        </Field>
        <Field>
            <Input type="checkbox"/>
            <Label>Example</Label>
        </Field>
    </Outer>

export default Filter