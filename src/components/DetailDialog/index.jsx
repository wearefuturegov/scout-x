import React, { useState, useEffect } from "react"
import styled from "styled-components"
import fetch from "isomorphic-unfetch"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import Loader from "../Loader"
import close from "./close.svg"
import theme from "../_theme"

const StyledDialog = styled(Dialog)`
    position: relative;
    padding: 35px;
    &:hover{
        box-shadow: 0px 2px 12px rgba(0,0,0,0.1);
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
        </StyledDialog>
        :
        <Loader/>

}

export default DetailDialog