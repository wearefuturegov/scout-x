import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import add from "./add.svg"
import useHover from "../../hooks/useHover"
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
        color: ${theme.linkHover};
    }
    &:active{
        color: ${theme.linkActive};
    }
    &:focus{
        background: ${theme.focus};
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
    &:before{
        background-image: url(${props => props.hovered ? remove : tick});
    }
`

const PinboardButton = ({
    service,
    isInPinboard,
    addToPinboard,
    removeFromPinboard,
    triggerAlert
}) => {

    const [hoverRef, isHovered] = useHover()

    const isPinned = isInPinboard(service.id)

    return(
        <div aria-live="polite" ref={hoverRef}>
            {isPinned ?        
                <RemoveButton hovered={isHovered} onClick={() => 
                    removeFromPinboard(service.id)
                }>
                    {isHovered ? "Remove?" : "Added"}
                </RemoveButton>
                :
                <AddButton onClick={() => {
                    addToPinboard(service)
                    triggerAlert("Added to pinboard")
                }}>Add to pinboard</AddButton>
            }
        </div>
    )
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