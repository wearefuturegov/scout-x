import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import Dialog from "../Dialog"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"
import ServiceCard from "../ServiceCard"
import fetch from "isomorphic-unfetch"


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
        <Dialog handleDismiss={handleDismiss} dialogTitle="Pinboard">
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
        </Dialog>
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