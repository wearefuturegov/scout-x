import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import PinboardButton from "../PinboardButton"
import { Helmet } from "react-helmet"
import Description from "../Description"
import "@reach/dialog/styles.css"
import Loader from "../Loader"
import { ButtonLink } from "../Button"
import Dialog from "../Dialog"
import Map from "./Map"
import {
    Header,
    Title,
    Tags,
    Tag,
    Caption,
    Location,
    LocationInner,
    Crosshead,
    Link,
    Body,
    DarkBody,
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
            .then(data => setService(data.service))
    }, [serviceId])

    return service ?
        <Dialog handleDismiss={handleDismiss} dialogTitle={service.name}>
            <Helmet>
                <title>{service.name} | Family information service | Buckinghamshire Council</title>}
            </Helmet>
            <Header>
                {service.organisation.name && <Caption>{service.organisation.name}</Caption>}
                <Title>{service.name}</Title>
                <Tags>
                    {service.taxonomies.map(taxonomy =>
                        <Tag key={taxonomy.id}>{taxonomy.name}</Tag>
                    )}
                </Tags>
            </Header>

            <Location>
                <Map
                    latitude={parseFloat(service.locations[0].latitude)}
                    longitude={parseFloat(service.locations[0].longitude)}
                />
                <LocationInner>
                    <Crosshead>Where</Crosshead>
                    <p>{service.locations[0].address_1}</p>
                    <p>{service.locations[0].city}</p>
                    <p>{service.locations[0].postal_code}</p>
                    <p><Link href={`https://maps.google.com/maps/search/${service.locations[0].postal_code}`}>Get directions</Link></p>
                </LocationInner>
            </Location>

            <Body>
                <Actions>
                    {service.url ?
                        <ButtonLink href={service.url}>Visit website</ButtonLink>
                        :
                        service.email &&
                            <ButtonLink href={`mailto:${service.email}`}>Send email</ButtonLink>
                    }
                    <PinboardButton service={service}/>
                </Actions>
                {service.description && <Description description={service.description}/>}

                <SplitContent>
                    <SplitContentSection>
                        <Crosshead>Contact</Crosshead>
                        <p>{service.email}</p>

                        <p>{service.contacts[0].name}</p>
                        <p>{service.contacts[0].title}</p>
                        <p>{service.contacts[0].phones[0].number}</p>

                    </SplitContentSection>
                </SplitContent>
            </Body>
            <DarkBody>

            </DarkBody>
            <Disclaimer>
                <p>We regularly check and update these community services, but can’t guarantee that they will always be accurate.</p>
                <p>If anything here is out of date or missing, please <a href={`https://outpost-staging.herokuapp.com/services/${service.id}/feedbacks`}>suggest an edit</a>.</p>
                <p>You may need a referral for some activities and groups. Contact the organiser if unsure.</p>
            </Disclaimer>
        </Dialog>
        :
        <Loader/>

}

export default DetailDialog