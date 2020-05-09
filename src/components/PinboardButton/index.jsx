import React, { useState } from "react"
import styled from "styled-components"
import theme from "../_theme"
import Button from "../Button"
import add from "./add.svg"
import remove from "./remove.svg"
import tick from "./tick.svg"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"
import { AlertContextConsumer } from "../../contexts/alertContext"

const BaseButton = styled.button`
    display: flex;
    text-align: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    font-weight: bold;
    color: ${theme.link};
    font-size: 1rem;
    padding: 18px 25px;
    cursor: pointer;
    width: 100%;
    &:before{
        margin-right: 10px;
        display: block;
        content: "";
        height: 15px;
        width: 15px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    &:hover{
        background: ${theme.pale};
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    @media screen and (min-width: ${theme.breakpointM}){
        width: inherit;
    }
`

const AddButton = styled(BaseButton)`
    &:before{
        background-image: url(${add});
    }
`

const RemoveButton = styled(BaseButton)`
    background: ${theme.pale};
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
    transition: opacity 0.1s ease-out;
    &:before{
        background-image: url(${remove});
    }
`

const Added = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    color: ${theme.link};
    padding: 18px 25px;
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
    @media screen and (min-width: ${theme.breakpointM}){
        width: inherit;
    }
`

const PinboardButton = ({
    service,
    isInPinboard,
    addToPinboard,
    removeFromPinboard,
    triggerAlert
}) => {

    const [justAdded, setJustAdded] = useState(false)

    return isInPinboard(service.id) ?
        <Added>
            Added
            {!justAdded && <RemoveButton onClick={() => removeFromPinboard(service.id)}>Remove?</RemoveButton>}
        </Added>
        :
        <AddButton onClick={() => {
            addToPinboard(service)
            triggerAlert("Added to pinboard")
        }}>Add to pinboard</AddButton>
}


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