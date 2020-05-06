import React, { useState, useEffect } from "react"
import styled from "styled-components"
import fetch from "isomorphic-unfetch"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import Loader from "../Loader"
import { ButtonLink } from "../Button"
import close from "./close.svg"
import theme from "../_theme"

const StyledDialog = styled(Dialog)`
    position: relative;
    padding: 30px;
    margin: 20px auto;
    width: 90vw;
    max-width: 700px;
    &:hover{
        box-shadow: 0px 2px 12px rgba(0,0,0,0.1);
    }
    @media screen and (min-width: ${theme.breakpointM}){
        margin: 60px auto;
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
    font-size: 1.2rem;
    margin-bottom: 10px;
`

const Title = styled.h1`
    color: ${theme.text};
    margin-bottom: 25px;
`

const Description = styled.div`
    margin-bottom: 25px;
    color: ${theme.text};
    p{
        margin-bottom: 10px;
        &:last-child{
            margin-bottom: 0px;
        }
    }
`

const Actions = styled.div`
    margin-bottom: 25px;
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
            {service.organisation.name && <Caption>{service.organisation.name}</Caption>}
            <Title>{service.name}</Title>
            <Actions>
                {service.url && <ButtonLink href={service.url}>Visit website</ButtonLink>}
            </Actions>
            <Description>
                {service.description.split("\n").map((paragraph, i) =>
                    <p key={i}>{paragraph}</p>
                )}
            </Description>
        </StyledDialog>
        :
        <Loader/>

}

export default DetailDialog