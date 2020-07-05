import React, { useState, useEffect } from "react"
import styled from "styled-components"
import theme from "../_theme"
import fetch from "isomorphic-unfetch"
import { daysSince } from "../../lib/utils"
import { Helmet } from "react-helmet"
import "@reach/dialog/styles.css"

import A from "../A"
import PinboardButton from "../PinboardButton"
import Description from "../Description"
import LocalOffer from "../LocalOffer"
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

const Crosshead = styled.h2`
    margin-bottom: 20px;
    color: ${theme.text};
`

const ContactsList = styled.div`
    div{
        margin-bottom: 25px;
        &:last-of-type{
            margin-bottom: 0px;
        }
    }
    @media screen and (min-width: ${theme.breakpointM}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 35px;
        div{
            margin-bottom: 0px;
        }
    }
`

const ContactName = styled.h3`
    /* margin-bottom: 5px; */
    line-height: 1.5;
    color; ${theme.text};
`

const ContactRole = styled.p`
    margin-bottom: 5px;
    font-style: italic;
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
            {daysSince(service.updated_at) > 180 && 
                <Banner>Last updated more than six months ago</Banner>
            }
            <Header>
                {service.organisation.name && 
                    <Caption>{service.organisation.name}</Caption>
                }
                <Title>{service.name}</Title>
            </Header>
            {service.locations.length === 1 &&  
                <SingleLocation {...service.locations[0]}/>
            }
            <FirstBody>
                <Actions>
                    {service.url ? 
                        <ButtonLink href={service.url}>Visit website</ButtonLink>
                        :
                        (service.contacts.length === 1 && service.contacts[0].email) && 
                            <ButtonLink href={`mailto:${service.contacts[0].email}`}>Send email</ButtonLink>
                    }
                    <PinboardButton service={service}/>
                </Actions>
                {service.description && <Description description={service.description}/>}
                {service.locations.length > 1 && <LocationAccordion locations={service.locations}/>}
            </FirstBody>
            <Body>
                <Crosshead>Good to know</Crosshead>
                <GoodToKnow {...service}/>
            </Body>

            {service.contacts.length > 0 &&
                <Body>
                    <Crosshead>Who to contact</Crosshead>
                    <ContactsList>
                        {service.contacts.map(contact =>
                            <div key={contact.id}>
                                <ContactName>{contact.name || service.name}</ContactName>
                                {contact.title && <ContactRole>{contact.title}</ContactRole>}
                                {contact.phone && <p>{contact.phone}</p>}
                                {contact.email && <p><A href={`mailto:${contact.email}`}>{contact.email}</A></p>}
                            </div>
                        )}
                    </ContactsList>
                </Body>
            }
            {service.local_offer &&
                <Body>
                    <Crosshead>Local offer and SEND</Crosshead>
                    <LocalOffer 
                        {...service.local_offer} 
                        taxonomies={service.taxonomies}
                    />
                </Body>
            }
        </Dialog>
        :
        <Loader/>

}

export default DetailDialog