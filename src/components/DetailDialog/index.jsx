import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import PinboardButton from "../PinboardButton"
import { Helmet } from "react-helmet"
import Description from "../Description"
import "@reach/dialog/styles.css"
import Loader from "../Loader"
import { ButtonLink } from "../Button"
import Dialog, { Body, Header, Title } from "../Dialog"
import Map from "./Map"
import {
    Tags,
    Tag,
    Caption,
    Location,
    LocationInner,
    Crosshead,
    DarkBody,
    A,
    Actions,
    SplitContent,
    SplitContentSection,
    Disclaimer
} from "./layout"

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
                <title>{service.name} | Family information service | Buckinghamshire Council</title>}
            </Helmet>
            <Header>
                {service.organisation.name && <Caption>{service.organisation.name}</Caption>}
                <Title>{service.name}</Title>
            </Header>
            {/* <Location>
                <Map
                    latitude={parseFloat(service.locations[0].latitude)}
                    longitude={parseFloat(service.locations[0].longitude)}
                />
                <LocationInner>
                    <Crosshead>Where</Crosshead>
                    <p>{service.locations[0].address_1}</p>
                    <p>{service.locations[0].city}</p>
                    <p>{service.locations[0].postal_code}</p>
                    <p><A href={`https://maps.google.com/maps/search/${service.locations[0].postal_code}`}>Get directions</A></p>
                </LocationInner>
            </Location> */}
            <Body>
                <Actions>
                    {service.url && <ButtonLink href={service.url}>Visit website</ButtonLink>}
                    <PinboardButton service={service}/>
                </Actions>
                {service.description && <Description description={service.description}/>}
            </Body>
        </Dialog>
        :
        <Loader/>

}

export default DetailDialog
