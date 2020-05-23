import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import { Outer, Label, Field } from "./layout"

const Input = styled.input`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 29px;
    border-radius: 100%;
    height: 29px;
    opacity: 0;
    &:checked + label:after{
        position: absolute;
        content: "";
        display: block;
        border-radius: 100%;
        background: ${theme.text};
        height: 19px;
        width: 19px;
        left: 5px;
        top: 5px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
`

export const Content = styled.div`
    padding: 25px 0px;
    border-top: 1px solid ${theme.cardShadow};
    border-bottom: 1px solid ${theme.cardShadow};
`

export const StyledField = styled(Field)`
    &:focus-within label:before{
        outline: none;
        box-shadow: 0px 0px 0px 3px ${theme.focus};
    }
`

export const StyledLabel = styled(Label)`
    &:before{
        border-radius: 100%;
    }
`


const RadioFilter = ({
    name,
    options,
    selection,
    setSelection,
    setPage,
    foldable
}) => {

    const handleChange = e => {
        setSelection(e.target.value)
        setPage(1)
    }

    return(
        <Outer>
                <Content>
                    {options.map(o =>
                        <StyledField key={o.value}>
                            <Input 
                                type="radio" 
                                id={o.value}
                                name={name}
                                value={o.value}
                                onChange={handleChange} 
                                checked={selection === o.value}
                            />
                            <StyledLabel htmlFor={o.value}>{o.label}</StyledLabel>
                        </StyledField>
                    )}
                </Content>
        </Outer>
    )
}

export default RadioFilter