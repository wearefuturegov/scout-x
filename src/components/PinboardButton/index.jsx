import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import Button from "../Button"
import add from "./add.svg"
import remove from "./remove.svg"
import tick from "./tick.svg"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"
import { AlertContextConsumer } from "../../contexts/alertContext"

const BaseButton = styled.button`
    &:before{
        display: block;
        content: "";
        height: 15px;
        width: 15px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
`

const AddButton = styled(BaseButton)`
    &:before{
        background-image: url(${add});
    }
`

const RemoveButton = styled(BaseButton)`
    &:before{
        background-image: url(${remove});
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