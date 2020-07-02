import React from "react"
import theme from "../_theme"
import styled from "styled-components"
import { buildServiceCardFooter, prettyDistance } from "../../lib/utils"
import localOfferIcon from "./local-offer.svg"

const Footer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    font-size: 0.9rem;
    color: ${theme.grey};
    line-height: 1.7;
`

const LocalOfferTag = styled.strong`
    margin-right: 15px;
    background: ${theme.focus};
    border-radius: 2px;
    padding: 0px 8px;
    &:before{
        content: "";
        display: inline-block;
        margin-right: 8px;
        width: 10px;
        height: 10px;
        background-image: url(${localOfferIcon});
        background-size: cover;
        background-position: center;
    }
`

const SpacesTag = styled(LocalOfferTag)`
    background: ${theme.green};
    &:before{
        content: none;
    }
`

const Point = styled.span`
    &:after{
        margin-left: 7px;
        content: "•";
        margin-right: 7px;
    }
    &:last-of-type:after{
        content: none;
    }
`

const Distance = styled(Point)`
    font-weight: bold;
`

const ServiceCardFooter = ({
    local_offer,
    distance_away,
    ...service
}) => 
    <Footer>
        {local_offer && <SpacesTag>Has spaces</SpacesTag>}
        {distance_away && <Distance>{prettyDistance(distance_away)}</Distance>}
        {buildServiceCardFooter(service).map(point =>
            <Point>{point}</Point>    
        )}
    </Footer>

export default ServiceCardFooter