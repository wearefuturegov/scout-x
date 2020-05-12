import React from "react"
import styled from "styled-components"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import close from "./close.svg"
import theme from "../_theme"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"
import ServiceCard from "../ServiceCard"
import fetch from "isomorphic-unfetch"

const StyledDialog = styled(Dialog)`
    position: relative;
    padding: 0px;
    margin: 20px auto;
    width: 90vw;
    max-width: 700px;
    &:hover{
        box-shadow: 0px 2px 12px rgba(0,0,0,0.1);
    }
    @media screen and (min-width: ${theme.breakpointM}){
        margin: 60px auto;
    }
    animation: splat 0.15s ease-out;
    @keyframes splat{
        from{
            opacity: 0;
            transform: scale(0.99);
        }
        to{
            opacity: 1;
            transform: scale(1);
        }
    }
`

const Header = styled.header`
    padding: 30px;
    @media screen and (min-width: ${theme.breakpointM}){
        padding: 45px;
    }
`

const Body = styled.ul`
    padding: 30px;
    list-style: none;
    background: ${theme.pale};
    @media screen and (min-width: ${theme.breakpointM}){
        padding: 45px;
    }
    li:last-child{
        margin-bottom: 0px;
    }
`

const Icon = styled.img`
    width: 30px;
    height: 30px;
`

const CloseButton = styled.button`
    position: absolute;
    right: 5px;
    top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    &:hover{
        background: ${theme.pale};
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

const Title = styled.h1`
    color: ${theme.text};
    margin-bottom: 0px;
    font-size: 1.5rem;
    @media screen and (min-width: ${theme.breakpointM}){
        font-size: 2rem;
    }
`

const Count = styled.span`
    font-weight: normal;
    /* margin-left: 10px; */
`

const PinboardDialog = ({
    location,
    navigate,
    pinboard
}) => {
    
    const handleDismiss = () => {
        navigate(`/${location.search}`)
    }

    const handleClick = async () => {
        let res = await fetch("/.netlify/functions/send-email", {
            method: "post",
            body: JSON.stringify(pinboard)
        })
        console.log(await res.json())
    }

    return (
        <StyledDialog onDismiss={handleDismiss} aria-label="Pinboard">
            <CloseButton onClick={handleDismiss}>
                <Icon src={close} alt="Close dialog"/>
            </CloseButton>
            <Header>
                <Title>
                    Pinned services
                    <Count> ({pinboard.length})</Count>
                </Title>
                <button onClick={handleClick}>Call lambda</button>
            </Header>
            <Body>
                {pinboard.map(pin =>
                    <ServiceCard key={pin.id} {...pin}/>    
                )}
            </Body>
        </StyledDialog>
    )
}

export default props =>
    <PinboardContextConsumer>
        {pinContext => 
            <PinboardDialog
                {...pinContext} 
                {...props}
            />
        }
    </PinboardContextConsumer>