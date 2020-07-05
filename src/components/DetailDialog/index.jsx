import React, { useState, useEffect } from "react"
import styled from "styled-components"
import theme from "../_theme"
import fetch from "isomorphic-unfetch"
import { daysSince } from "../../lib/utils"
import { Helmet } from "react-helmet"
import "@reach/dialog/styles.css"

import PinboardButton from "../PinboardButton"
import Description from "../Description"
import Loader from "../Loader"
import { ButtonLink } from "../Button"
import Dialog, { Body, Header, Title } from "../Dialog"
import SingleLocation from "./SingleLocation"
import LocationAccordion from "./LocationAccordion"
import GoodToKnow from "./GoodToKnow"

const Banner = styled.p`
  background: ${theme.pale};
  padding: 10px 50px;
  font-size: 0.9rem;
  color: ${theme.grey};
  text-align: center;
`

const Caption = styled.p`
    color: ${theme.grey};
    margin-bottom: 10px;
    font-size: 1.1rem;
    @media screen and (min-width: ${theme.breakpointM}){
        font-size: 1.2rem;
    }
`

const FirstBody = styled(Body)`
    padding-top: 0px;
    @media screen and (min-width: ${theme.breakpointM}) {
        padding-top: 0px;
    }     
`

const Actions = styled.div`
    margin-bottom: 30px;
    a:first-of-type{
        margin-bottom: 25px;
    }
    @media screen and (min-width: ${theme.breakpointM}) {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 40px;
        a:first-of-type{
            margin-bottom: 0px;
            margin-right: 30px;
        }
    }
`

export const SecondBody = styled(Body)`
    background: ${theme.pale};
`

const Crosshead = styled.h2`
    margin-bottom: 5px;
    color: ${theme.text};
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
            .then(data => setService(data))
    }, [serviceId])

    return service ?
        <Dialog handleDismiss={handleDismiss} dialogTitle={service.name}>
            <Helmet>
                <title>{service.name} | Family information service | Buckinghamshire Council</title>
            </Helmet>

            {daysSince(service.updated_at) > 180 && <Banner>Last updated more than six months ago</Banner>}

            <Header>
                {service.organisation.name && <Caption>{service.organisation.name}</Caption>}
                <Title>{service.name}</Title>
            </Header>

            {service.locations.length === 1 &&  <SingleLocation {...service.locations[0]}/>}

            <FirstBody>
                <Actions>
                    {service.url ? 
                        <ButtonLink href={service.url}>Visit website</ButtonLink>
                        :
                        (service.contacts.length === 1 && service.contacts[0].email) && <ButtonLink href={`mailto:${service.contacts[0].email}`}>Send email</ButtonLink>
                    }
                    <PinboardButton service={service}/>
                </Actions>
                {service.description && <Description description={service.description}/>}
                {service.locations.length > 1 && <LocationAccordion locations={service.locations}/>}
            </FirstBody>

            <SecondBody>
                <Crosshead>Good to know</Crosshead>
                <GoodToKnow {...service}/>
            </SecondBody>

        </Dialog>
        :
        <Loader/>

}

export default DetailDialog