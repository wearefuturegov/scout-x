import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import Button from "../Button"
import add from "./add.svg"
import remove from "./remove.svg"
import tick from "./tick.svg"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"
import { AlertContextConsumer } from "../../contexts/alertContext"

const AddButton = styled(Button)`
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
        background-image: url(${add});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`

const Added = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    color: ${theme.link};
    padding: 15px 20px;
    font-weight: bold;
    &:before{
        display: block;
        margin-right: 10px;
        content: "";
        height: 15px;
        width: 15px;
        background-image: url(${tick});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    &:hover button,
    &:focus-within button{
        opacity: 1;
    }
`

const RemoveButton = styled.button`
    position: absolute;
    top: 0px;
    left: 0px;
    min-width: 100%;
    height: 100%;
    padding: 15px 20px;
    opacity: 0;
    cursor: pointer;
    display: inline-flex;
    font-size: 1rem;
    flex-direction: row;
    align-items: center;
    border: none;
    color: ${theme.link};
    background: ${theme.pale};
    font-weight: bold;
    &:before{
        display: block;
        margin-right: 10px;
        content: "";
        height: 15px;
        width: 15px;
        background-image: url(${remove});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`

const PinboardButton = ({
    service,
    isInPinboard,
    addToPinboard,
    removeFromPinboard,
    triggerAlert
}) => isInPinboard(service.id) ?
    <Added>
        Added
        <RemoveButton onClick={() => removeFromPinboard(service.id)}>Remove?</RemoveButton>
    </Added>
    :
    <AddButton onClick={() => {
        addToPinboard(service)
        triggerAlert("Added to pinboard")
    }}>Add to pinboard</AddButton>

export default props =>
    <AlertContextConsumer>
        {alertContext =>
            <PinboardContextConsumer>
                {pinContext => 
                    <PinboardButton 
                        {...pinContext} 
                        {...alertContext} 
                        {...props}
                    />
                }
            </PinboardContextConsumer>
        }
    </AlertContextConsumer>