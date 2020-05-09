import React, { useState, useEffect } from "react"
import styled from "styled-components"
import fetch from "isomorphic-unfetch"
import { Dialog } from "@reach/dialog"
import PinboardButton from "../PinboardButton"
import "@reach/dialog/styles.css"
import Loader from "../Loader"
import { ButtonLink } from "../Button"
import close from "./close.svg"
import theme from "../_theme"
import Map from "./Map"

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

const Body = styled.div`
    padding: 30px;
    @media screen and (min-width: ${theme.breakpointM}){
        padding: 45px;
    }
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

const Icon = styled.img`
    width: 30px;
    height: 30px;
`

const Caption = styled.p`
    color: ${theme.grey};
    margin-bottom: 10px;
    font-size: 1.1rem;
    @media screen and (min-width: ${theme.breakpointM}){
        font-size: 1.2rem;
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

const Description = styled.article`
    margin-bottom: 25px;
    color: ${theme.text};
    p{
        line-height: 1.4;
        margin-bottom: 10px;
        &:last-child{
            margin-bottom: 0px;
        }
    }
`

const Actions = styled.div`
    a:first-of-type{
        margin-bottom: 15px;
        @media screen and (min-width: ${theme.breakpointM}) {
            margin-bottom: 0px;
            margin-right: 10px;
        }
    }
    margin-bottom: 25px;
`

const Tags = styled.div`
    margin-top: 8px;
`

const Tag = styled.span`
    display: inline-block;
    padding: 5px;
    font-size: 0.8rem;
    color: ${theme.link};
    background: ${theme.linkBackground};
    border-radius: 2px;
    margin-right: 7px;
    margin-top: 7px;
`

const DetailDialog = ({
    serviceId,
    location,
    navigate
}) => {

    const [service, setService] = useState(false)
    
    const handleDismiss = () => {
        navigate(`/${location.search}`)
    }

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_HOST}/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data.service))
    }, [serviceId])

    return service ?
        <StyledDialog onDismiss={handleDismiss} aria-label={service.name}>
            <CloseButton onClick={handleDismiss}>
                <Icon src={close} alt="Close dialog"/>
            </CloseButton>
            <Header>
                {service.organisation.name && <Caption>{service.organisation.name}</Caption>}
                <Title>{service.name}</Title>
                <Tags>
                    {service.taxonomies.map(taxonomy =>
                        <Tag key={taxonomy.id}>{taxonomy.name}</Tag>
                    )}
                </Tags>
            </Header>
            <Map
                latitude={51.815606}
                longitude={-0.8084017}
            />
            <Body>
                <Actions>
                    {service.url && <ButtonLink href={service.url}>Visit website</ButtonLink>}
                    <PinboardButton service={service}/>
                </Actions>
                <Description>
                    {service.description.split("\n").map((paragraph, i) =>
                        <p key={i}>{paragraph}</p>
                    )}
                </Description>
            </Body>
        </StyledDialog>
        :
        <Loader/>

}

export default DetailDialog