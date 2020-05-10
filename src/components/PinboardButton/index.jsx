import React, { useState, useEffect } from "react"
import useHover from "../../hooks/useHover"
import styled from "styled-components"
import theme from "../_theme"
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
        background-image: url(${tick});
    }
    &:hover:before{
        background-image: url(${props => props.justPinned ? tick : remove});
    }
`

const PinboardButton = ({
    service,
    isInPinboard,
    addToPinboard,
    removeFromPinboard,
    triggerAlert
}) => {

    const isPinned = isInPinboard(service.id)
    const [justPinned, setJustPinned] = useState(false)
    const [ref, isHovered] = useHover()

    const handleMouseOut = () => setJustPinned(false)

    useEffect(() => {
        let node = ref.current
        if (node) {
            node.addEventListener('mouseout', handleMouseOut)
            return () => {
                node.removeEventListener('mouseout', handleMouseOut)
            }
        }
    }, [ref])

    return(
        <div aria-live="polite" ref={ref}>
            {isPinned ?        
                <RemoveButton 
                    justPinned={justPinned}
                    onClick={() => removeFromPinboard(service.id)}
                >
                    {(!justPinned && isHovered) ? "Remove?" : "Added"}
                </RemoveButton>
                :
                <AddButton onClick={() => {
                    setJustPinned(true)
                    addToPinboard(service)
                    triggerAlert("Added to pinboard")
                }}>Add to pins</AddButton>
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