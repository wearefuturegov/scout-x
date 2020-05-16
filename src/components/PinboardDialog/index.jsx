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
    margin-top: 15px;
    display: block;
    text-align: center;
    padding: 10px 25px;
    background:  ${theme.link};
    color: ${theme.white};
    font-weight: bold;
    text-decoration: none;
    border: 3px solid ${theme.link};
    &:first-of-type{
        margin-top: 25px;
    }
    &:hover{
        background: ${theme.linkHover};
        border-color: ${theme.linkHover}
    }
    &:active{
        background: ${theme.linkActive};
        border-color: ${theme.linkActive}
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    @media screen and (min-width: ${theme.breakpointM}){
        display: inline-block;
        margin-right: 15px;
    }
`

const SkeletonA = styled(A)`
    color: ${theme.link};
    background: none;
    &:hover{
        background: none;
        color: ${theme.linkHover};
    }
    &:active{
        background: none;
        color: ${theme.linkActive};
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
                <SkeletonA href="/print" target="blank">Email list</SkeletonA>
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