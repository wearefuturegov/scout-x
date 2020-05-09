import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import Button from "../Button"
import add from "./add.svg"
import remove from "./remove.svg"

const StructButton = styled(Button)`
    border: none;
    padding: 15px 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &:hover{
        background: ${theme.pale};
        color: ${theme.link};
    }
    &:before{
        display: block;
        margin-right: 10px;
        content: "";
        height: 15px;
        width: 15px;
        background-image: url(${props => props.remove ? remove : add});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`

const PinboardButton = ({
    remove
}) =>
    <StructButton remove={remove}>Add to pinboard</StructButton>

export default PinboardButton