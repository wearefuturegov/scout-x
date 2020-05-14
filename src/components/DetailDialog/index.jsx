import React, { useState, useEffect } from "react"
import styled from "styled-components"
import fetch from "isomorphic-unfetch"
import { Dialog } from "@reach/dialog"
import PinboardButton from "../PinboardButton"
import { Helmet } from "react-helmet"
import Description from "../Description"
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
        margin: 40px auto;
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

const Location = styled.section`
    position: relative;
    padding: 30px;
    min-height: 250px;
    @media screen and (min-width: ${theme.breakpointM}) {
        padding: 45px;
    }
`

const LocationInner = styled.div`
    display: block;
    position: relative;
    background: ${theme.white};
    padding: 25px;
    width: 100%;
    max-width: 270px;
`

const Crosshead = styled.h3`
    margin-bottom: 5px;
    color: ${theme.text};
`

const Link = styled.a`
    color: ${theme.link};
    &:hover{
        text-decoration: none
    }
    &:focus{
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
`

const SplitContent = styled.section``

const SplitContentSection = styled.aside``

const Disclaimer = styled.footer`
    padding: 30px;
    text-align: center;
    @media screen and (${theme.breakpointM}){
            padding: 45px;
    }
    p{
        margin-bottom: 10px;
    }
    a{
        color: ${theme.link};
        &:hover{
            text-decoration: none;
        }
        &:focus{
            background: ${theme.focus};
            outline: 1px solid ${theme.focus};
        }
        &:active{
            color: ${theme.text};
        }
    }
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

    console.log(service)

    return service ?
        <StyledDialog onDismiss={handleDismiss} aria-label={service.name}>
            <Helmet>
                <title>{service.name} | Family information service | Buckinghamshire Council</title>
            </Helmet>
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
            <Disclaimer>
                <p>We regularly check and update these community services, but can’t guarantee that they will always be accurate.</p>
                <p>If anything here is out of date or missing, please <a href={`https://outpost-staging.herokuapp.com/services/${service.id}/feedbacks`}>suggest an edit</a>.</p>
                <p>You may need a referral for some activities and groups. Contact the organiser if unsure.</p>
            </Disclaimer>
        </StyledDialog>
        :
        <Loader/>

}

export default DetailDialog