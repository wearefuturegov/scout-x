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

const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`

const Legend = styled.legend`
    font-weight: bold;
    color: ${theme.text};
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

const ClearButton = styled.button`
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

const Filter = ({
    legend,
    options,
    selection,
    setSelection
}) => {

    const handleChange = e => {
        let {checked, value} = e.target
        if(checked){
            setSelection([...selection, value]  )
        } else {
            setSelection(selection.filter(el=> el !== value))
        }
    }

    const clear = () => setSelection([])

    return(
        <Outer>
            <Header>
                <Legend>{legend}</Legend>
                {selection.length > 0 && 
                    <ClearButton onClick={clear}>Clear</ClearButton>
                }
            </Header>
            {options.map(o =>
                <Field key={o.value}>
                    <Input 
                        type="checkbox" 
                        id={o.value}
                        value={o.value}
                        onChange={handleChange} 
                        checked={selection.includes(o.value)}
                    />
                    <Label htmlFor={o.value}>{o.label}</Label>
                </Field>
            )}
        </Outer>
    )
}

export default Filter