import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import Dialog, { Header, Title } from "../Dialog"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"
import ServiceCard from "../ServiceCard"

export const Body = styled.ul`
    padding: 25px;
    list-style: none;
    background: ${theme.pale};
    @media screen and (min-width: ${theme.breakpointM}){
        padding: 45px;
    }
    li:last-child{
        margin-bottom: 0px;
    }
`

const A = styled.a`
margin-top: 25px;
    display: inline-block;
    text-align: center;
    padding: 10px 25px;
    background:  ${theme.link};
    color: ${theme.white};
    font-weight: bold;
    text-decoration: none;
    &:hover{
        background: ${theme.linkHover};
    }
    &:active{
        background: ${theme.linkActive};
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

const Count = styled.span`
    font-weight: normal;
`

const PinboardDialog = ({
    location,
    navigate,
    pinboard
}) => {
    
    const handleDismiss = () => {
        navigate(`/${location.search}`)
    }

    return (
        <Dialog handleDismiss={handleDismiss} dialogTitle="Pinboard">
            <Header>
                <Title>
                    Pinned services
                    <Count> ({pinboard.length})</Count>
                </Title>
                <A href="/print" target="blank">Print list</A>
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