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
    padding: 35px;
    margin: 20px auto;
    width: 90vw;
    max-width: 700px;
    &:hover{
        box-shadow: 0px 2px 12px rgba(0,0,0,0.1);
    }
    @media screen and (min-width: ${theme.breakpointM}){
        margin: 60px auto;
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
            <h2>{service.name}</h2>
            {service.description.split("\n").map((paragraph, i) =>
                <p key={i}>{paragraph}</p>
            )}
            {service.url && <ButtonLink href={service.url}>Visit website</ButtonLink>}
        </StyledDialog>
        :
        <Loader/>

}

export default DetailDialog